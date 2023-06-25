'use client'

import DataTable from '@/components/CustomTable/DataTable'
import { Box } from '@mui/material'

import clientClolumns from './clientColumns'
import { Client } from '@/types/client'

const data: Client[] = [
  {
    nome: 'Osvaldo',
    numeroDocumento: '64073-580',
    tipoDocumento: 'RG',
    logradouro: 'Rua Themis Parentes',
    numero: '2',
    bairro: 'Uruguai',
    cidade: 'Teresina',
    uf: 'PI',
  },
  {
    nome: 'Thaís',
    numeroDocumento: '68903-853',
    tipoDocumento: 'RG',
    logradouro: 'Avenida Sétima',
    numero: '22',
    bairro: 'Araxá',
    cidade: 'Macapá',
    uf: 'AP',
  },
  {
    nome: 'Clodoaldo',
    numeroDocumento: '77064-626',
    tipoDocumento: 'RG',
    logradouro: 'Rua S 2',
    numero: '241',
    bairro: 'AraxSetor Sul (Taquaralto)á',
    cidade: 'Palmas',
    uf: 'TO',
  },
]

const ClientsSection = () => {
  return (
    <Box component='section'>
      <DataTable searchTerm='nome' data={data} columns={clientClolumns} />
    </Box>
  )
}
export default ClientsSection
