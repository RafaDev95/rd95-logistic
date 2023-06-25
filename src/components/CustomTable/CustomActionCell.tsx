'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material'

import { toast } from 'react-hot-toast'

import ContentCopy from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

type Props = {
  infoToCopy: string | number
  onDelete: (id: number) => Promise<boolean>
  id: number
  activateUpdateState: () => void
  onOpen: () => void
  setItemIdToUpdate: (id: number) => void
  title: string
  pathToRedirect: string
}

const CustomActionCell = ({
  infoToCopy,
  id,
  onDelete,
  activateUpdateState,
  onOpen,
  setItemIdToUpdate,
  title,
  pathToRedirect,
}: Props) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    const isSuccess = await onDelete(id)

    if (isSuccess) {
      toast.success('Removido')
      handleClose()
    } else {
      toast.error('Algo deu errado.')
    }
  }

  const handleUpdate = () => {
    setItemIdToUpdate(id)
    activateUpdateState()
    onOpen()
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
            <ListItemText onClick={() => handleCopy()}>Copiar ID</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Deletar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleUpdate}>
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => router.push(`/${pathToRedirect}/${id}`)}>
            <ListItemIcon>
              <VisibilityIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Ver {title}</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
export default CustomActionCell
