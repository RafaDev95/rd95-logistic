import { createTheme } from '@mui/material/styles'
import { Josefin_Sans } from 'next/font/google'
import { yellow, red } from '@mui/material/colors'

const josefin_Sans = Josefin_Sans({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const colors = {
  main: '#FF6600',
  lightGray: '#cbcccd',
  darkGray: '#444444',
  textPrimary: '#0a0a0a',
  background: '#f5f5f5',
}

const theme = createTheme({
  colors,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'action' },
          style: {
            backgroundColor: '#FF6600',
            outline: 'none',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,102,0,0.9)',
              boxShadow: '0px 2px 6px 0px rgba(255,102,0,0.9)',
            },
            '&:disabled': {
              opacity: 0.6,
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#cbcccd',
            outline: 'none',
            color: '#0a0a0a',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(203,204,205,0.8)',
              boxShadow: '0px 2px 6px 0px rgba(203,204,205,0.8)',
            },
          },
        },
        {
          props: { variant: 'ghost' },
          style: {
            outline: 'none',
            color: '#0a0a0a',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
        {
          props: { variant: 'error' },
          style: {
            backgroundColor: red[700],
            outline: 'none',
            color: 'white',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: red[600],
              boxShadow: `0px 2px 6px 0px ${red[600]}`,
            },
          },
        },
        {
          props: { variant: 'warning' },
          style: {
            backgroundColor: yellow[700],
            outline: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: yellow[600],
              boxShadow: `0px 2px 6px 0px ${yellow[600]}`,
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'sectionTitle' },
          style: {
            fontWeight: 600,
            textDecoration: 'underline',
            fontStyle: 'italic',
            fontSize: '1.5rem',
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: josefin_Sans.style.fontFamily,
  },
})

export default theme
