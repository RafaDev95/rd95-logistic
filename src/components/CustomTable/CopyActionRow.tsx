'use client'

import * as React from 'react'

import { Menu, MenuItem, MenuList, ListItemIcon, ListItemText, IconButton } from '@mui/material'

import { toast } from 'react-hot-toast'

import ContentCopy from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type Props = {
  infoToCopy: string | number
}

const CopyActionRow = ({ infoToCopy }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCopy = () => {
    toast.success('Copiado')
    navigator.clipboard.writeText(String(infoToCopy))
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        aria-label='open menu'
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy fontSize='small' />
            </ListItemIcon>
            <ListItemText onClick={() => handleCopy()}>Copiar Documento</ListItemText>
          </MenuItem>
          {/* <Divider /> */}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <VisibilityIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Ver Condutor</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
export default CopyActionRow
