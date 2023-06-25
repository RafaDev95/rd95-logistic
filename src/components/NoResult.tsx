'use client'

import { Box, Button, Typography, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
  title: string
  subtitle: string
}

const NoResult = ({ title, subtitle }: Props) => {
  const router = useRouter()
  return (
    <Box display='flex' height='700px' flexDirection='column' alignItems='center' gap={2}>
      <Image
        src='/404.svg'
        alt='404 number'
        width={400}
        height={400}
        style={{ objectFit: 'contain' }}
      />

      <Stack spacing={2} alignItems='center'>
        <Typography variant='h1'>{title}</Typography>
        <Typography fontSize='1.5rem'>{subtitle}</Typography>
        <Button variant='action' onClick={() => router.push('/')}>
          Voltar
        </Button>
      </Stack>
    </Box>
  )
}
export default NoResult
