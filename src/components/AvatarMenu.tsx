'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material'

import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal'

import {
  useClientModalStore,
  useConductorModalStore,
  useDisplacementModalStore,
  useVehicleModalStore,
} from '@/shared/hooks'

const AvatarMenu = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const clientModal = useClientModalStore()
  const conductorModal = useConductorModalStore()
  const vehicleModal = useVehicleModalStore()
  const displacementModal = useDisplacementModalStore()

  const redirectUserAndOpenModal = (
    path: string,
    modalToOpen: 'client' | 'conductor' | 'vehicle' | 'displacement'
  ) => {
    router.push(`/${path}`)

    setTimeout(() => {
      switch (modalToOpen) {
        case 'client':
          clientModal.onOpen()
          break
        case 'conductor':
          conductorModal.onOpen()
          break
        case 'vehicle':
          vehicleModal.onOpen()
          break
        case 'displacement':
          displacementModal.onOpen()
          break

        default:
          break
      }
    }, 500)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title='Menu'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 35, height: 35, bgcolor: theme.colors.main, boxShadow: theme.shadows[4] }}
          >
            M
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => redirectUserAndOpenModal('clients', 'client')}>
          <PersonAdd sx={{ mr: 1, color: theme.colors.darkGray }} /> Cadastrar Cliente
        </MenuItem>
        <MenuItem onClick={() => redirectUserAndOpenModal('conductores', 'conductor')}>
          <AirlineSeatReclineNormalIcon sx={{ mr: 1, color: theme.colors.darkGray }} />
          Cadastrar Condutor
        </MenuItem>
        <MenuItem onClick={() => redirectUserAndOpenModal('vehicles', 'vehicle')}>
          <LocalShippingIcon sx={{ mr: 1, color: theme.colors.darkGray }} /> Cadastrar Veículo
        </MenuItem>
        <MenuItem onClick={() => redirectUserAndOpenModal('displacements', 'displacement')}>
          <AddLocationAltIcon sx={{ mr: 1, color: theme.colors.darkGray }} /> Novo Deslocamento
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}

export default AvatarMenu
