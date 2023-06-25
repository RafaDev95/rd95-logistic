'use client'

import { ColumnDef } from '@tanstack/react-table'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { Button } from '@mui/material'

import CustomActionCell from '@/components/CustomTable/CustomActionCell'

type Props<T extends { id: number }> = {
  onDelete: (id: number) => Promise<boolean>
  title: string
  activateUpdateState: () => void
  onOpen: () => void
  setItemIdToUpdate: (id: number) => void
  pathToRedirect: string
  columnsHead: ColumnDef<T>[]
}

function useColumns<T extends { id: number }>({
  onDelete,
  title,
  activateUpdateState,
  onOpen,
  setItemIdToUpdate,
  pathToRedirect,
  columnsHead,
}: Props<T>) {
  const columns: ColumnDef<T>[] = [
    {
      id: 'actions',
      cell: ({ row }) => {
        const info = row.original

        return (
          <CustomActionCell
            infoToCopy={info.id}
            onDelete={onDelete}
            id={info.id}
            title={title}
            activateUpdateState={activateUpdateState}
            onOpen={onOpen}
            setItemIdToUpdate={setItemIdToUpdate}
            pathToRedirect={pathToRedirect}
          />
        )
      },
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='small'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            endIcon={<ArrowDropDownIcon />}
          >
            ID
          </Button>
        )
      },
    },
    ...columnsHead,
  ]

  return { columns }
}
export default useColumns
