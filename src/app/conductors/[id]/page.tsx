import { getConductorById } from '@/app/api/conductor'
import ConductorTemplate from './ConductorTemplate'

const ConductorPage = async ({ params }: { params: { id: number } }) => {
  const conductor = await getConductorById(params.id)

  return <ConductorTemplate conductor={conductor} />
}
export default ConductorPage
