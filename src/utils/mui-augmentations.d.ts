import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      main: string
      lightGray: string
      darkGray: string
      textPrimary: string
      background: string
    }
  }
  interface ThemeOptions {
    colors: {
      main: string
      lightGray: string
      darkGray: string
      textPrimary: string
      background: string
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true
    secondary: true
    ghost: true
    error: true
    warning: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sectionTitle: true
  }
}
