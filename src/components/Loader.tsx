'use client'

import { Box, CircularProgress, useTheme } from '@mui/material'

const Loader = () => {
  const theme = useTheme()
  return (
    <Box
      display='flex'
      height='700px'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress size={70} sx={{ color: theme.colors.main }} />
    </Box>
  )
}
export default Loader
