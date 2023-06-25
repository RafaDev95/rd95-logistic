import { getClientById } from '@/app/api/client'
import ClientTemplate from './ClientTemplate'

const ClientPage = async ({ params }: { params: { id: number } }) => {
  const client = await getClientById(params.id)

  return <ClientTemplate client={client} />
}
export default ClientPage
