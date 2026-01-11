import { NextResponse } from 'next/server'

const AFFINDA_API_URL = 'https://api.affinda.com/v2/resumes'
const MINDEE_API_URL =
  'https://api.mindee.net/v1/products/mindee/resume_parser/v1/predict'
const PDL_API_URL = 'https://api.peopledatalabs.com/v5/person/enrich'

type ParseInput = {
  file?: File
  linkedinUrl?: string
}

const getProvider = (requestUrl: string) => {
  const url = new URL(requestUrl)
  return (
    url.searchParams.get('provider') ??
    process.env.RESUME_PARSER_PROVIDER ??
    'affinda'
  )
}

const parseAffinda = async ({ file, linkedinUrl }: ParseInput) => {
  const token = process.env.AFFINDA_API_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'AFFINDA_API_TOKEN is not set' },
      { status: 500 }
    )
  }

  if (linkedinUrl) {
    return NextResponse.json(
      { error: 'Affinda POC only supports file uploads' },
      { status: 400 }
    )
  }

  const body = new FormData()
  if (file) {
    body.append('file', file, file.name)
  }

  const response = await fetch(AFFINDA_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  })

  const data = await response.json()
  return NextResponse.json(
    { provider: 'affinda', status: response.status, data },
    { status: response.status }
  )
}

const parseMindee = async ({ file, linkedinUrl }: ParseInput) => {
  if (linkedinUrl) {
    return NextResponse.json(
      { error: 'Mindee POC only supports file uploads' },
      { status: 400 }
    )
  }

  const apiKey = process.env.MINDEE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'MINDEE_API_KEY is not set' },
      { status: 500 }
    )
  }

  if (!file) {
    return NextResponse.json(
      { error: 'Mindee requires a resume file upload' },
      { status: 400 }
    )
  }

  const body = new FormData()
  body.append('document', file, file.name)

  const response = await fetch(MINDEE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
    },
    body,
  })

  const data = await response.json()
  return NextResponse.json(
    { provider: 'mindee', status: response.status, data },
    { status: response.status }
  )
}

const parsePeopleDataLabs = async ({ file, linkedinUrl }: ParseInput) => {
  if (file) {
    return NextResponse.json(
      { error: 'People Data Labs POC only supports LinkedIn URLs' },
      { status: 400 }
    )
  }

  if (!linkedinUrl) {
    return NextResponse.json(
      { error: 'People Data Labs requires a LinkedIn URL' },
      { status: 400 }
    )
  }

  const apiKey = process.env.PDL_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'PDL_API_KEY is not set' },
      { status: 500 }
    )
  }

  const url = new URL(PDL_API_URL)
  url.searchParams.set('profile', linkedinUrl)
  url.searchParams.set('pretty', 'true')

  const response = await fetch(url.toString(), {
    headers: {
      'X-Api-Key': apiKey,
    },
  })

  const data = await response.json()
  return NextResponse.json(
    { provider: 'pdl', status: response.status, data },
    { status: response.status }
  )
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json(
      { error: 'Expected multipart/form-data' },
      { status: 415 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const linkedinUrl = formData.get('linkedinUrl')

  const parseInput: ParseInput = {
    file: file instanceof File ? file : undefined,
    linkedinUrl: typeof linkedinUrl === 'string' ? linkedinUrl : undefined,
  }

  if (!parseInput.file && !parseInput.linkedinUrl) {
    return NextResponse.json(
      { error: 'Provide a resume file or LinkedIn URL' },
      { status: 400 }
    )
  }

  const provider = getProvider(request.url).toLowerCase()

  if (provider === 'affinda') {
    return parseAffinda(parseInput)
  }

  if (provider === 'mindee') {
    return parseMindee(parseInput)
  }

  if (provider === 'pdl') {
    return parsePeopleDataLabs(parseInput)
  }

  return NextResponse.json(
    { error: `Unsupported provider: ${provider}` },
    { status: 400 }
  )
}
