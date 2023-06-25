import '../styles/globals.css'
import { Josefin_Sans } from 'next/font/google'

import Header from '@/components/Header'
import CustomThemeProvider from '@/libs/CustomThemeProvider'
import Footer from '@/layout/Footer'

const font = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'RD95 - Logistic',
  description: 'Ligistics Service',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='/icons/truck-icon.png' />
      </head>
      <body className={font.className}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CustomThemeProvider>
            <Header />
            {children}
            <Footer />
          </CustomThemeProvider>
        </div>
      </body>
    </html>
  )
}
