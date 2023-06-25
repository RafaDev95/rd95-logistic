'use client'

import { format, parseISO } from 'date-fns'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Box, Typography, Button, Container, Stack, useTheme, ButtonGroup } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useDisplacementModalStore } from '@/shared/hooks'
import { DisplacementResponse } from '@/types/displacement'
import { deleteDisplacement } from '@/app/api/displacement'
import useDate from '@/hooks/useDate'

type Props = {
  displacement: DisplacementResponse
}

const othersInfo = [
  {
    label: 'Custos Adicionais',
    text: 'Nenhum',
  },
  {
    label: 'Imprevistos ou Avarias',
    text: 'Nenhum',
  },
  {
    label: 'Local de hospedagem',
    text: 'Não foi necessário',
  },
]

const basicInfos = [
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
  },
  {
    accessorKey: 'fimDeslocamento',
    header: 'Data de conclusão',
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

const DisplacementsTemplate = ({ displacement }: Props) => {
  const router = useRouter()
  const theme = useTheme()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { activateUpdateState, onOpen, setDisplacementIdToUpate } = useDisplacementModalStore()

  const { userFriendlyDateFormat } = useDate('')

  const handleUpdate = () => {
    setDisplacementIdToUpate(displacement.id)
    activateUpdateState()

    router.push('/displacements')

    setTimeout(() => {
      onOpen()
    }, 500)
  }

  const handleDelete = async () => {
    const isSuccess = await deleteDisplacement(displacement.id)

    if (isSuccess) {
      toast.success('Deletado')

      router.push('/displacements')
    } else {
      toast.error('Algo inesperado aconteceu.')
    }
  }

  const parsedData = parseISO(displacement.inicioDeslocamento)
  const formattedData = format(parsedData, 'dd/MM/yyyy')

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
        Deslocamento - {displacement?.id}
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
          <Image
            src='/pages/location.png'
            alt='location mark'
            fill
            style={{ objectFit: 'contain' }}
          />
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

            {basicInfos.map((info) => (
              <Typography key={info.accessorKey}>
                {info.header}:{' '}
                <span>
                  {info.accessorKey === 'inicioDeslocamento' && displacement?.inicioDeslocamento
                    ? userFriendlyDateFormat(displacement.inicioDeslocamento)
                    : info.accessorKey === 'fimDeslocamento' && displacement?.fimDeslocamento
                    ? userFriendlyDateFormat(displacement.fimDeslocamento)
                    : info.accessorKey === 'kmFinal' && !displacement?.kmFinal
                    ? 'Não concluído'
                    : displacement?.[info.accessorKey as keyof typeof displacement]}
                </span>
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
export default DisplacementsTemplate
