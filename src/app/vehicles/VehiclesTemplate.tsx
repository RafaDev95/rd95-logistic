'use client'

import { Box, Typography, Container, Button, useTheme } from '@mui/material'

import DataTable from '@/components/CustomTable/DataTable'
import { RegisterVehicleModal } from '@/components/Modals'
import { useVehicleModalStore } from '@/shared/hooks'
import { VehicleResponse } from '@/types/vehicle'
import useColumns from '@/hooks/useColumns'
import { RegisterVehicleFormData } from '@/components/Modals/RegisterVehicleModal'

type Props = {
  fetchedData: VehicleResponse[]
  onDelete: (id: number) => Promise<boolean>
  onRegister: (data: RegisterVehicleFormData) => Promise<boolean>
  onUpdate: (data: RegisterVehicleFormData, id: number) => Promise<boolean>
}

export const columnsHead = [
  {
    accessorKey: 'placa',
    header: 'Placa',
  },
  {
    accessorKey: 'marcaModelo',
    header: 'Marca - Modelo',
  },
  {
    accessorKey: 'anoFabricacao',
    header: 'Ano de Fabricação',
  },
  {
    accessorKey: 'kmAtual',
    header: 'KM Atual',
  },
]

const VehiclesTemplate = ({ fetchedData, onDelete, onRegister, onUpdate }: Props) => {
  const theme = useTheme()
  const { onOpen, activateUpdateState, setVehicleIdToUpate } = useVehicleModalStore()

  const { columns } = useColumns<VehicleResponse>({
    onDelete,
    onOpen,
    pathToRedirect: 'vehicles',
    setItemIdToUpdate: setVehicleIdToUpate,
    activateUpdateState,
    title: 'Veículo',
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
        Veículos
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
          Cadastrar Veículo
        </Button>
        <RegisterVehicleModal onRegister={onRegister} onUpdate={onUpdate} />
        <DataTable searchTerm='placa' columns={columns} data={fetchedData} />
      </Box>
    </Container>
  )
}
export default VehiclesTemplate
