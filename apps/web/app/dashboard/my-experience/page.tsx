import InitExperiencePage from './_init/page'
import CompleteExperiencePage from './_complete/page'

export default function MyExperiencePage() {
  const hasExperience = true
  return hasExperience ? <CompleteExperiencePage /> : <InitExperiencePage />
}
