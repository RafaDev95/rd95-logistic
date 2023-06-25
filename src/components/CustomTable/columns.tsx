'use client'

import { ColumnDef } from '@tanstack/react-table'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { Button } from '@mui/material'

import { ClientResponse } from '@/types/client'
import CopyActionRow from './CopyActionRow'

const columns: ColumnDef<ClientResponse>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const info = row.original

      return <CopyActionRow infoToCopy={info.id} />
    },
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          size='small'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          endIcon={<ArrowDropDownIcon />}
        >
          Nome
        </Button>
      )
    },
  },
  {
    accessorKey: 'numeroDocumento',
    header: 'Nª Documento',
  },
  {
    accessorKey: 'tipoDocumento',
    header: 'Tipo do Documento',
  },
  {
    accessorKey: 'logradouro',
    header: 'Logradouro',
  },
  {
    accessorKey: 'numero',
    header: 'Número',
  },
  {
    accessorKey: 'bairro',
    header: 'Bairro',
  },
  {
    accessorKey: 'cidade',
    header: 'Cidade',
  },
  {
    accessorKey: 'uf',
    header: 'UF',
  },
]

export default columns
