import { getVehicleById } from '@/app/api/vehicle'
import VehicleTemplate from './VehicleTemplate'

const VehiclePage = async ({ params }: { params: { id: number } }) => {
  const vechile = await getVehicleById(params.id)

  return <VehicleTemplate vehicle={vechile} />
}
export default VehiclePage
