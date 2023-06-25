'use client'

import { Box, Typography, Container, Button, useTheme } from '@mui/material'

import DataTable from '@/components/CustomTable/DataTable'
import { Client, ClientResponse } from '@/types/client'
import { RegisterClientModal } from '@/components/Modals'
import { useClientModalStore } from '@/shared/hooks'
import useColumns from '@/hooks/useColumns'

type Props = {
  fetchedData: ClientResponse[]
  onDelete: (id: number) => Promise<boolean>
  onRegister: (data: Client) => Promise<boolean>
  onUpdate: (data: Client, id: number) => Promise<boolean>
}

export const columnsHead = [
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'bairro',
    header: 'Bairro',
  },
  {
    accessorKey: 'cidade',
    header: 'Cidade',
  },
  {
    accessorKey: 'uf',
    header: 'UF',
  },
  {
    accessorKey: 'logradouro',
    header: 'Logradouro',
  },
  {
    accessorKey: 'numero',
    header: 'Nª',
  },
  {
    accessorKey: 'numeroDocumento',
    header: 'Nª do Documento',
  },
  {
    accessorKey: 'tipoDocumento',
    header: 'Tipo do Documento',
  },
]

const ClientsTemplate = ({ fetchedData, onDelete, onRegister, onUpdate }: Props) => {
  const theme = useTheme()
  const { onOpen, activateUpdateState, setClientIdToUpate } = useClientModalStore()

  const { columns } = useColumns<ClientResponse>({
    onDelete,
    onOpen,
    pathToRedirect: 'clients',
    setItemIdToUpdate: setClientIdToUpate,
    activateUpdateState,
    title: 'Cliente',
    columnsHead,
  })

  return (
    <Container sx={{ mt: 15 }}>
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: 600,
          letterSpacing: '.2rem',

          p: 1,
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            mb: 10,
          },
        }}
        className='bg-gradient'
      >
        Clientes
      </Typography>

      <Box sx={{ p: 2, mt: 2, position: 'relative' }}>
        <Button
          sx={{
            position: 'absolute',
            right: 40,
            top: 35,
            [theme.breakpoints.down('md')]: {
              right: 20,
              top: -25,
            },
          }}
          variant='action'
          onClick={onOpen}
        >
          Cadastrar Cliente
        </Button>
        <RegisterClientModal onRegister={onRegister} onUpdate={onUpdate} />
        <DataTable searchTerm='nome' columns={columns} data={fetchedData} />
      </Box>
    </Container>
  )
}
export default ClientsTemplate
