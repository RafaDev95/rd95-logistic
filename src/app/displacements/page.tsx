import {
  CompleteDisplacementSimplifiedToRegister,
  DisplacementSimplifiedToRegister,
} from '@/types/displacement'
import { revalidatePath } from 'next/cache'
import {
  getDisplacements,
  deleteDisplacement,
  registerDisplacement,
  updateDisplacement,
} from '../api/displacement'

import DisplacementsTemplate from './DisplacementsTemplate'

const onDelete = async (id: number): Promise<boolean> => {
  'use server'
  const response = await deleteDisplacement(id)

  revalidatePath('/displacements')

  return response
}

const onRegister = async (data: DisplacementSimplifiedToRegister): Promise<boolean> => {
  'use server'
  const response = await registerDisplacement(data)

  revalidatePath('/displacements')

  return response
}

const onUpdate = async (
  data: CompleteDisplacementSimplifiedToRegister,
  id: number
): Promise<boolean> => {
  'use server'
  const response = await updateDisplacement(data, id)

  revalidatePath('/displacements')

  return response
}

const DisplacementsPage = async () => {
  const data = await getDisplacements()

  return (
    <DisplacementsTemplate
      fetchedData={data}
      onDelete={onDelete}
      onRegister={onRegister}
      onUpdate={onUpdate}
    />
  )
}
export default DisplacementsPage
