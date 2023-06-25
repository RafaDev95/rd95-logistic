'use client'

import Link from 'next/link'

import Logo from '@/components/Logo'
import { Box, Typography, Button, useTheme, IconButton, Stack } from '@mui/material'

import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'

const icons = [TwitterIcon, InstagramIcon, WhatsAppIcon, EmailIcon]

const Footer = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        mt: 10,
        pb: 2,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          gap: 2,
          textAlign: 'center',
        },
      }}
    >
      <Box component={Link} href='/' width={120} height={70} position='relative'>
        <Logo />
      </Box>
      <Typography>All rights reserved © 2023 RD95-Delivery.</Typography>
      <Stack direction='row'>
        {icons.map((Icon, i) => (
          <IconButton sx={{ '&:hover': { '&>svg': { color: theme.colors.main } } }} key={i}>
            {<Icon />}
          </IconButton>
        ))}
      </Stack>
    </Box>
  )
}
export default Footer
