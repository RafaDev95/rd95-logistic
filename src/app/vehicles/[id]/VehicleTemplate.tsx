'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Typography, Button, Container, Stack, useTheme, ButtonGroup } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { VehicleResponse } from '@/types/vehicle'
import { deleteVehicle } from '@/app/api/vehicle'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useVehicleModalStore } from '@/shared/hooks'
import { columnsHead } from '../VehiclesTemplate'

type Props = {
  vehicle: VehicleResponse
}

const maintenanceInformations = [
  {
    label: 'Troca óleo e filtros',
    text: '20/05/2023',
  },
  {
    label: 'Calibragem de pneus',
    text: '20/05/2023',
  },
  {
    label: 'Freios',
    text: '20/05/2023',
  },
  {
    label: 'Vencimento do Documento',
    text: '10/02/2028',
  },
]

const VehiclesTemplate = ({ vehicle }: Props) => {
  const router = useRouter()
  const theme = useTheme()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { activateUpdateState, onOpen, setVehicleIdToUpate } = useVehicleModalStore()

  const handleUpdate = () => {
    setVehicleIdToUpate(vehicle.id)
    activateUpdateState()

    router.push('/vehicles')

    setTimeout(() => {
      onOpen()
    }, 500)
  }

  const handleDelete = async () => {
    const isSuccess = await deleteVehicle(vehicle.id)

    if (isSuccess) {
      toast.success('Deletado')

      router.push('/vehicles')
    } else {
      toast.error('Algo inesperado aconteceu.')
    }
  }

  return (
    <Container
      sx={{
        mt: 15,
        minHeight: '70vh',
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: 600,
          letterSpacing: '.2rem',
          p: 1,
          textAlign: 'center',
        }}
        className='bg-gradient'
      >
        Veículo - {vehicle?.id}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
          },
          alignItems: 'center',
          py: 5,
        }}
      >
        <Box
          position='relative'
          sx={{
            flex: { lg: 1, md: 'inherit', sm: 'inherit' },
            width: '100%',
            height: 400,
          }}
        >
          <Image src='/pages/truck-2.png' alt='truck' fill style={{ objectFit: 'contain' }} />
        </Box>

        <Box
          sx={{
            flex: { lg: 1, md: 1, sm: 'inherit', xs: 'inherit' },
            display: 'flex',
            gap: 2,
            [theme.breakpoints.down('md')]: {
              pb: 10,
              flexDirection: 'column',
            },
            alignItems: 'center',
            justifyContent: 'space-around',
            p: 3,
            borderRadius: '1rem',
            position: 'relative',
          }}
          className='bg-gradient'
        >
          <Stack
            spacing={2}
            p={2}
            sx={{
              bgcolor: 'white',
              borderRadius: '1rem',
              maxWidth: 260,
              '&>p': {
                fontWeight: 'bold',
                '&>span': {
                  fontWeight: 'normal',
                  textDecoration: 'underline',
                  fontStyle: 'italic',
                },
              },
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', color: theme.colors.main, mb: 2 }}>
              Informações básicas
            </Typography>

            {columnsHead.map((info) => (
              <Typography key={info.accessorKey}>
                {info.header}: <span>{vehicle?.[info.accessorKey as keyof typeof vehicle]}</span>
              </Typography>
            ))}

            <Typography>
              KM de cadastro: <span>0</span>
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            p={2}
            sx={{
              maxWidth: 350,
              mb: 'auto',
              bgcolor: 'white',
              borderRadius: '1rem',
              '&>p': {
                fontWeight: 'bold',
                '&>span': {
                  fontWeight: 'normal',
                  textDecoration: 'underline',
                  fontStyle: 'italic',
                },
              },
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', color: theme.colors.main, mb: 2 }}>
              Manutenções
            </Typography>
            {maintenanceInformations.map((info) => (
              <Typography key={info.label}>
                {info.label}: <span>{info.text}</span>
              </Typography>
            ))}
          </Stack>
          <ButtonGroup
            sx={{
              display: 'flex',
              alignItems: 'end',
              height: '90px',
              position: 'absolute',
              right: 10,
              bottom: 10,
              gap: 2,
            }}
          >
            <Button variant='warning' startIcon={<EditIcon />} onClick={handleUpdate}>
              Editar
            </Button>
            {showDeleteConfirm ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'end',
                  height: '70px',
                  mt: 1,
                }}
              >
                <Typography color='white'>Deletar ?</Typography>
                <ButtonGroup sx={{ gap: 1 }}>
                  <Button variant='error' onClick={handleDelete}>
                    Sim
                  </Button>
                  <Button variant='warning' onClick={() => setShowDeleteConfirm(false)}>
                    Não
                  </Button>
                </ButtonGroup>
              </Box>
            ) : (
              <Button
                variant='error'
                endIcon={<DeleteForeverIcon />}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Deletar
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  )
}
export default VehiclesTemplate
