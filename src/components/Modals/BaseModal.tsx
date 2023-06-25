'use client'

import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
  bodyContent: React.ReactNode
}

const BaseModal = ({ title, isOpen, onClose, bodyContent }: Props) => {
  return (
    <Box>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '.5rem',
            p: 4,
            width: '100%',
            maxWidth: 700,
          }}
        >
          <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='sectionTitle'>{title}</Typography>
            <IconButton
              sx={{
                '&:hover': {
                  '&>svg': {
                    color: 'black',
                  },
                },
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {bodyContent}
        </Box>
      </Modal>
    </Box>
  )
}

export default BaseModal
