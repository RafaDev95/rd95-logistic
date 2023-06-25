'use client'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'
import theme from '../styles/theme'

type Props = {
  children: React.ReactNode
}

const CustomThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </Container>
    </ThemeProvider>
  )
}
export default CustomThemeProvider
