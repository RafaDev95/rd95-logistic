'use client'

import NoResult from '@/components/NoResult'
import { Box } from '@mui/material'
import { useEffect } from 'react'

type Props = {
  error: Error
}

const ErrorState = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box mt={15}>
      <NoResult
        title='Hm...'
        subtitle='Algo não ocorreu como esperado. Por favor, volte para página inicial.'
      />
    </Box>
  )
}

export default ErrorState
