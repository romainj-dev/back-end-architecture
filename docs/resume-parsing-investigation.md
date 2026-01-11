# Resume parsing investigation (My Experience)

## Shortlist (meets criteria)

### Affinda Resume Parser
- **Why it fits:** Dedicated resume parser with a free tier and broad support for PDF/DOC/DOCX/TXT inputs.
- **Free/cheap plan:** Free tier available (pay-as-you-go beyond the included usage).
- **Format coverage:** Handles a wide range of resume layouts (multi-column, ATS-style, etc.).
- **Notes:** POC uses file uploads only.

### Mindee Resume Parser
- **Why it fits:** Resume parser built on OCR/doc understanding with a generous free tier and strong document coverage.
- **Free/cheap plan:** Free tier available with a monthly quota.
- **Format coverage:** Good for scans and varied layouts thanks to OCR.
- **Notes:** File upload only for this POC.

### People Data Labs (LinkedIn URL enrichment)
- **Why it fits:** Enriches public LinkedIn profile URLs into structured JSON with a free tier.
- **Free/cheap plan:** Free tier available (monthly credit allowance).
- **Format coverage:** Works on LinkedIn profile URLs instead of files.
- **Notes:** Best for LinkedIn URLs; not a resume file parser.

## Proof-of-concept implementation (current UI)

The UI already has the resume upload and LinkedIn URL inputs. The POC connects those to
`/api/resume/parse`, which calls a provider and **console logs the parsed JSON**.

### How to try each provider

1. **Affinda**
   - Set env var: `AFFINDA_API_TOKEN=<your-token>`
   - Optional: `RESUME_PARSER_PROVIDER=affinda` (server default) or
     `NEXT_PUBLIC_RESUME_PARSER_PROVIDER=affinda` (client override)
   - Upload a resume from **My Experience → Share your experience** and check the browser
     console for the parsed JSON.

2. **Mindee**
   - Set env var: `MINDEE_API_KEY=<your-key>`
   - Optional: `RESUME_PARSER_PROVIDER=mindee` or
     `NEXT_PUBLIC_RESUME_PARSER_PROVIDER=mindee`
   - Upload a resume and check the browser console for the parsed JSON.

3. **People Data Labs (LinkedIn)**
   - Set env var: `PDL_API_KEY=<your-key>`
   - Optional: `RESUME_PARSER_PROVIDER=pdl` or
     `NEXT_PUBLIC_RESUME_PARSER_PROVIDER=pdl`
   - Paste a LinkedIn URL and check the browser console for the parsed JSON.

### POC behavior
- The client sends the selected file (or LinkedIn URL) as `multipart/form-data`.
- The API route forwards the file to the provider, then returns the JSON response.
- The UI logs the response to the browser console.
