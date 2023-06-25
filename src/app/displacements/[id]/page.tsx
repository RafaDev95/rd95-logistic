import { getDisplacementById } from '@/app/api/displacement'
import DisplacementTemplate from './DisplacementTemplate'

const DisplacementPage = async ({ params }: { params: { id: number } }) => {
  const displacement = await getDisplacementById(params.id)

  console.log(displacement)

  return <DisplacementTemplate displacement={displacement} />
}
export default DisplacementPage
