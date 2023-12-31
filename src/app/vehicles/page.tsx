import { RegisterVehicleFormData } from '@/components/Modals/RegisterVehicleModal'
import { revalidatePath } from 'next/cache'
import { deleteVehicle, getVehiclesData, registerVehicle, updateVehicle } from '../api/vehicle'
import VehiclesTemplate from './VehiclesTemplate'

const onDelete = async (id: number): Promise<boolean> => {
  'use server'
  const response = await deleteVehicle(id)

  revalidatePath('/vehicles')

  return response
}

const onRegister = async (data: RegisterVehicleFormData): Promise<boolean> => {
  'use server'
  const response = await registerVehicle(data)

  revalidatePath('/vehicles')

  return response
}

const onUpdate = async (data: RegisterVehicleFormData, id: number): Promise<boolean> => {
  'use server'
  const response = await updateVehicle(data, id)

  revalidatePath('/vehicles')

  return response
}

const VehiclesPage = async () => {
  const data = await getVehiclesData()

  return (
    <VehiclesTemplate
      fetchedData={data}
      onDelete={onDelete}
      onRegister={onRegister}
      onUpdate={onUpdate}
    />
  )
}
export default VehiclesPage
