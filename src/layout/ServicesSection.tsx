'use client'

import Image from 'next/image'

import { Box, Typography, Paper, Button, useTheme, Grid } from '@mui/material'

const services = [
  {
    image: '/user-register.png',
    title: 'Cadastro de Clientes',
  },
  {
    image: '/driver-register.png',
    title: 'Cadastro de Condutores',
  },
  {
    image: '/vehicle-register.png',
    title: 'Cadastro de Veículos',
  },
  {
    image: '/displacement.png',
    title: 'Deslocamento',
  },
]

const ServicesSection = () => {
  const theme = useTheme()
  return (
    <Box component='section' mt={1} id='services'>
      <Typography variant='sectionTitle'>Serviços</Typography>

      <Grid container spacing={2} mt={2}>
        {services.map((item, i) => (
          <Grid item key={i} md={3} sm={6} xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                gap: 3,
                p: 2,
              }}
            >
              <Box position='relative' width={100} height={100}>
                <Image
                  src={item.image}
                  fill
                  style={{ objectFit: 'contain' }}
                  alt='Computer screen with a person document'
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  [theme.breakpoints.down('lg')]: {
                    height: '58px',
                  },
                }}
              >
                {item.title}
              </Typography>

              <Typography sx={{ color: theme.colors.darkGray }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit officiis molestias
                repellendus ut molestiae aspernatur.
              </Typography>

              <Button variant='action' size='small'>
                Saiba mais
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default ServicesSection
