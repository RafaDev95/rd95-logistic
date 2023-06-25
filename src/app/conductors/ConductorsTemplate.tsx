'use client'

import { Box, Typography, Container, Button, useTheme } from '@mui/material'

import DataTable from '@/components/CustomTable/DataTable'
import { Conductor, ConductorResponse } from '@/types/conductor'
import { RegisterConductorModal } from '@/components/Modals'
import { useConductorModalStore } from '@/shared/hooks'
import useColumns from '@/hooks/useColumns'
import { ColumnDef } from '@tanstack/react-table'
import useDate from '@/hooks/useDate'

type Props = {
  fetchedData: ConductorResponse[]
  onDelete: (id: number) => Promise<boolean>
  onRegister: (data: Conductor) => Promise<boolean>
  onUpdate: (data: Conductor, id: number) => Promise<boolean>
}

const ConductorsTemplate = ({ fetchedData, onDelete, onRegister, onUpdate }: Props) => {
  const theme = useTheme()
  const { onOpen, activateUpdateState, setConductorIdToUpate } = useConductorModalStore()
  const { userFriendlyDateFormat } = useDate('')

  const columnsHead: ColumnDef<ConductorResponse>[] = [
    {
      accessorKey: 'nome',
      header: 'Nome',
    },
    {
      accessorKey: 'numeroHabilitacao',
      header: 'Nª da Habilitação',
    },
    {
      accessorKey: 'catergoriaHabilitacao',
      header: 'Categoria da Habilitação',
    },
    {
      accessorKey: 'vencimentoHabilitacao',
      header: 'Vencimento Da Habilitação',
      cell: ({ row }) => {
        const info = row.original

        return <span>{userFriendlyDateFormat(info.vencimentoHabilitacao)}</span>
      },
    },
  ]

  const { columns } = useColumns<ConductorResponse>({
    onDelete,
    onOpen,
    pathToRedirect: 'conductors',
    setItemIdToUpdate: setConductorIdToUpate,
    activateUpdateState,
    title: 'Condutor',
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
        Condutores
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
          Cadastrar Condutor
        </Button>
        <RegisterConductorModal onRegister={onRegister} onUpdate={onUpdate} />
        <DataTable searchTerm='nome' columns={columns} data={fetchedData} />
      </Box>
    </Container>
  )
}
export default ConductorsTemplate
