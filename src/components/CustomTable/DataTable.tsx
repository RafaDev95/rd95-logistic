import React from 'react'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  TextField,
  Button,
} from '@mui/material'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchTerm: string
}

const DataTable = <TData, TValue>({ columns, data, searchTerm }: DataTableProps<TData, TValue>) => {
  const theme = useTheme()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <Box sx={{ bgcolor: theme.colors.background, p: 1, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 4 }}>
          <TextField
            placeholder={`Buscar por ${searchTerm}`}
            value={(table.getColumn(searchTerm)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(searchTerm)?.setFilterValue(event.target.value)}
            variant='standard'
          />
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: '.5rem', p: 2, maxHeight: 470 }}>
          <Table sx={{ minWidth: 650, minHeight: 300 }}>
            <TableHead sx={{ bgcolor: theme.colors.background }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} component='th' scope='row'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{ height: '6rem', textAlign: 'center' }}
                    component='th'
                    scope='row'
                  >
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2, py: 4 }}>
        <Button
          variant='secondary'
          size='small'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='secondary'
          size='small'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </Box>
    </div>
  )
}

export default DataTable
