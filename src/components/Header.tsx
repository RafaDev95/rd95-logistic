'use client'

import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'

import { useState } from 'react'
import { Box, Toolbar, AppBar, Typography, Container, Stack, useTheme, Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import Logo from './Logo'
import AvatarMenu from './AvatarMenu'

const navItems = [
  {
    label: 'Serviços',
    href: 'services',
  },
  {
    label: 'Apresentação',
    href: 'apresentation',
  },
  {
    label: 'Demonstração',
    href: 'demonstration',
  },
]

const userNavItems = [
  {
    label: 'Clientes',
    href: '/clients',
  },
  {
    label: 'Veículos',
    href: '/vehicles',
  },
  {
    label: 'Condutores',
    href: '/conductors',
  },
  { label: 'Deslocamentos', href: '/displacements' },
]

const Header = () => {
  const theme = useTheme()

  const isTablet = useMediaQuery('(max-width:768px)')

  const [isOn, setIsOn] = useState(true)

  const navItemsToShow = isOn ? userNavItems : navItems

  const LinkBasedOnUser = (item: { label: string; href: string }) => {
    if (!isOn) {
      return (
        <Typography
          key={item.href}
          activeClass='active'
          to={item.href}
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
          component={ScrollLink}
          sx={{
            color: theme.colors.textPrimary,
            cursor: 'pointer',
            transition: 'transform .4s ease',
            px: 1,
            '&:hover': {
              transform: 'translateY(-10px)',
            },
          }}
        >
          {item.label}
        </Typography>
      )
    } else {
      return (
        <Typography
          key={item.href}
          component={Link}
          href={item.href}
          sx={{
            color: theme.colors.textPrimary,
            cursor: 'pointer',
            transition: 'transform .4s ease',
            px: 1,
            '&:hover': {
              transform: 'translateY(-10px)',
            },
          }}
        >
          {item.label}
        </Typography>
      )
    }
  }

  return (
    <AppBar sx={{ bgcolor: theme.colors.background }}>
      <Container>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component={Link} href='/' width={120} height={70} position='relative'>
            <Logo />
          </Box>
          <Stack
            direction='row'
            gap={3}
            sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}
          >
            {navItemsToShow.map((item) => LinkBasedOnUser(item))}
          </Stack>
          <Box
            sx={{
              width: { lg: '250px', md: '250px', sm: '150px' },
            }}
          >
            <Button
              onClick={() => setIsOn(!isOn)}
              sx={{
                color: 'white',
                transition: 'background-color 0.3s ease',
                mr: 'auto',
                bgcolor: `${isOn ? '#5cb85c' : '#c9100a'}`,
                '&:hover': {
                  bgcolor: `${isOn ? '#5cb85c' : '#c9100a'}`,
                },
              }}
            >
              {!isTablet && 'Modo usuário:'} {isOn ? 'On' : 'Off'}
            </Button>
            {isOn && <AvatarMenu />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
