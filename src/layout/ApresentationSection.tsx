'use client'

import Image from 'next/image'
import { Box, Typography } from '@mui/material'

const ApresentationSection = () => {
  return (
    <Box
      component='section'
      id='apresentation'
      sx={{
        my: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
          md: 'row',
          sm: 'column',
          xs: 'column',
        },
        gap: 5,
        backgroundImage: 'url(/wave.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top-bottom',
      }}
    >
      <Box
        sx={{
          flex: { md: 1, sm: 'inherit' },
          height: 400,
          position: 'relative',
          borderRadius: '.5rem',
        }}
      >
        <Image
          src='/hero-image-2.png'
          alt='truck'
          fill
          style={{ objectFit: 'contain', transform: 'scaleX(-1)' }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant='h4' className='text-gradient-invert'>
          Gerenciamento necessário para quem busca qualidade.
        </Typography>
        <Typography mt={2}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet deleniti maxime harum
          aliquid enim dolorum quis ipsa doloribus debitis nisi? Itaque ipsa excepturi quisquam
          iusto.
        </Typography>
      </Box>
    </Box>
  )
}
export default ApresentationSection
