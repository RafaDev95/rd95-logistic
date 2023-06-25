'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Typography, Button, Container, Stack, useTheme, ButtonGroup } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { ConductorResponse } from '@/types/conductor'
import { deleteConductor } from '@/app/api/conductor'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useConductorModalStore } from '@/shared/hooks'

type Props = {
  conductor: ConductorResponse
}

const basicInformations = [
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
  },
]

const othersInfo = [
  {
    label: 'Data de cadastro',
    text: '20/01/2023',
  },
  {
    label: 'Entregas Realizadas',
    text: '523',
  },
  {
    label: 'Avaliação',
    text: 'Excelente.',
  },
]

const ConductorTemplate = ({ conductor }: Props) => {
  const router = useRouter()
  const theme = useTheme()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { activateUpdateState, onOpen, setConductorIdToUpate } = useConductorModalStore()

  const handleUpdate = () => {
    setConductorIdToUpate(conductor?.id)
    activateUpdateState()

    router.push('/conductors')

    setTimeout(() => {
      onOpen()
    }, 500)
  }

  const handleDelete = async () => {
    const isSuccess = await deleteConductor(conductor.id)

    if (isSuccess) {
      toast.success('Deletado')

      router.push('/conductors')
    } else {
      toast.error('Algo inesperado aconteceu.')
    }
  }

  return (
    <Container sx={{ mt: 15, minHeight: '70vh' }}>
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
        Condutor - {conductor?.id}
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
            flex: { lg: 0.5, md: 'inherit', sm: 'inherit' },
            width: '100%',
            height: 400,
          }}
        >
          <Image src='/pages/person.png' alt='person' fill style={{ objectFit: 'contain' }} />
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
              maxWidth: 320,
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
              Informações básicas
            </Typography>

            {basicInformations.map((info) => (
              <Typography key={info.accessorKey}>
                {info.header}:{' '}
                <span>{conductor?.[info.accessorKey as keyof typeof conductor]}</span>
              </Typography>
            ))}
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
              Outras Informações
            </Typography>
            {othersInfo.map((info) => (
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
export default ConductorTemplate
