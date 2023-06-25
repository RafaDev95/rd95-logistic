import { Conductor } from '@/types/conductor'
import { revalidatePath } from 'next/cache'
import {
  deleteConductor,
  updateConductor,
  getConductors,
  registerConductor,
} from '../api/conductor'

import ConductorsTemplate from './ConductorsTemplate'

const onDelete = async (id: number): Promise<boolean> => {
  'use server'
  const response = await deleteConductor(id)

  revalidatePath('/conductors')

  return response
}

const onRegister = async (data: Conductor): Promise<boolean> => {
  'use server'
  const response = await registerConductor(data)

  revalidatePath('/conductors')

  return response
}

const onUpdate = async (data: Conductor, id: number): Promise<boolean> => {
  'use server'
  const response = await updateConductor(data, id)

  revalidatePath('/conductors')

  return response
}

const ConductorsPage = async () => {
  const data = await getConductors()

  return (
    <ConductorsTemplate
      fetchedData={data}
      onDelete={onDelete}
      onRegister={onRegister}
      onUpdate={onUpdate}
    />
  )
}
export default ConductorsPage
