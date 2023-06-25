'use client'

import { Box, Typography } from '@mui/material'
import ClientsSection from './ClientsSection/ClientsSection'

const DemonstrantionSection = () => {
  return (
    <Box component='section' id='demonstration'>
      <Typography variant='sectionTitle'>Demonstração</Typography>

      <Box p={2} my={2} className='bg-gradient'>
        <Typography color='white' mb={2}>
          Tabela de Clientes
        </Typography>
        <ClientsSection />
      </Box>
    </Box>
  )
}
export default DemonstrantionSection
