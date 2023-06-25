'use client'
import { Container, Box, Typography, ButtonGroup, Button, useTheme } from '@mui/material'

import Image from 'next/image'

const HeroSection = () => {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { md: 10, sm: 0, xs: 0 },
        flexDirection: {
          md: 'row',
          sm: 'column',
          xs: 'column',
        },
      }}
    >
      <Box
        position='relative'
        sx={{
          flex: { md: 0.8, sm: 'inherit' },
          width: {
            sm: '400px',
            xs: '300px',
          },
          height: { md: '400px', sm: '300px', xs: '300px' },
        }}
      >
        <Image
          src='/delivery.svg'
          alt='A man holding a box, with a pickup behind him'
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box sx={{ flex: 0.7 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.5rem',
            fontStyle: 'italic',
          }}
          className='text-gradient'
        >
          Soluções Logísticas
        </Typography>
        <Typography variant='body1' my={2} sx={{ textAlign: 'justify' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur asperiores nobis neque
          sunt non quo accusantium nisi deleniti officiis labore natus, impedit nam fugit vitae,
          eligendi tempora quis possimus. Eligendi harum consectetur nostrum sunt pariatur, quo
          eaque deleniti dicta asperiores nihil reprehenderit! Ut non vero, minus omnis sint tempora
          error.
        </Typography>
        {/* <ButtonGroup> */}
        <Button variant='action'>Começar</Button>
        {/* <Button>View Demo</Button> */}
        {/* </ButtonGroup> */}
      </Box>
    </Box>
  )
}
export default HeroSection
