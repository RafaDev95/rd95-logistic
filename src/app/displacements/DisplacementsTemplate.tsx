'use client'

import { Box, Typography, Container, Button, useTheme } from '@mui/material'

import DataTable from '@/components/CustomTable/DataTable'
import {
  DisplacementResponse,
  CompleteDisplacementSimplifiedToRegister,
  DisplacementSimplifiedToRegister,
} from '@/types/displacement'
import { DisplacementModal } from '@/components/Modals'
import { useDisplacementModalStore } from '@/shared/hooks'
import useColumns from '@/hooks/useColumns'
import useDate from '@/hooks/useDate'
import { ColumnDef } from '@tanstack/react-table'

type Props = {
  fetchedData: DisplacementResponse[]
  onDelete: (id: number) => Promise<boolean>
  onRegister: (data: DisplacementSimplifiedToRegister) => Promise<boolean>
  onUpdate: (data: CompleteDisplacementSimplifiedToRegister, id: number) => Promise<boolean>
}

const DisplacementsTemplate = ({ fetchedData, onDelete, onRegister, onUpdate }: Props) => {
  const theme = useTheme()
  const { onOpen, activateUpdateState, setDisplacementIdToUpate } = useDisplacementModalStore()

  const { userFriendlyDateFormat } = useDate('')

  const columnsHead: ColumnDef<DisplacementResponse>[] = [
    {
      accessorKey: 'kmInicial',
      header: 'KM inicial',
    },
    {
      accessorKey: 'kmFinal',
      header: 'KM final',
    },
    {
      accessorKey: 'inicioDeslocamento',
      header: 'Data início',
      cell: ({ row }) => {
        const info = row.original

        return <span>{userFriendlyDateFormat(info.inicioDeslocamento)}</span>
      },
    },
    {
      accessorKey: 'fimDeslocamento',
      header: 'Data de conclusão',
      cell: ({ row }) => {
        const info = row.original

        return (
          <span>
            {info.fimDeslocamento ? userFriendlyDateFormat(info.fimDeslocamento) : 'Em aberto'}
          </span>
        )
      },
    },
    {
      accessorKey: 'checkList',
      header: 'Check List',
    },
    {
      accessorKey: 'motivo',
      header: 'Motivo',
    },
    {
      accessorKey: 'observacao',
      header: 'Observação',
    },
    {
      accessorKey: 'idCondutor',
      header: 'ID do Condutor',
    },
    {
      accessorKey: 'idVeiculo',
      header: 'ID do Veículo',
    },
    {
      accessorKey: 'idCliente',
      header: 'ID do Cliente',
    },
  ]

  const { columns } = useColumns<DisplacementResponse>({
    onDelete,
    onOpen,
    pathToRedirect: 'displacements',
    setItemIdToUpdate: setDisplacementIdToUpate,
    activateUpdateState,
    title: 'Deslocamento',
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
        Deslocamentos
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
          Cadastrar Deslocamento
        </Button>
        <DisplacementModal onRegister={onRegister} onUpdate={onUpdate} />
        <DataTable searchTerm='motivo' columns={columns} data={fetchedData} />
      </Box>
    </Container>
  )
}
export default DisplacementsTemplate
