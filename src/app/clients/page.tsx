import { Client } from '@/types/client'
import { revalidatePath } from 'next/cache'
import { getClients, deleteClient, registerClient, updateClient } from '../api/client'

import ClientsTemplate from './ClientsTemplate'

const onDelete = async (id: number): Promise<boolean> => {
  'use server'
  const response = await deleteClient(id)

  revalidatePath('/clients')

  return response
}

const onRegister = async (data: Client): Promise<boolean> => {
  'use server'
  const response = await registerClient(data)

  revalidatePath('/clients')

  return response
}

const onUpdate = async (data: Client, id: number): Promise<boolean> => {
  'use server'
  const response = await updateClient(data, id)

  revalidatePath('/clients')

  return response
}

const ClientsPage = async () => {
  const data = await getClients()

  return (
    <ClientsTemplate
      fetchedData={data}
      onDelete={onDelete}
      onRegister={onRegister}
      onUpdate={onUpdate}
    />
  )
}
export default ClientsPage
