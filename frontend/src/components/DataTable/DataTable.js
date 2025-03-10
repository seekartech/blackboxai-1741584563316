import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import EmptyState from '../EmptyState';

function DataTable({
  columns = [],
  data = [],
  loading = false,
  error = null,
  page = 0,
  rowsPerPage = 10,
  totalRows = 0,
  orderBy = '',
  order = 'asc',
  onPageChange,
  onRowsPerPageChange,
  onSort,
  emptyMessage = 'Tidak ada data tersedia',
  sx = {},
  ...props
}) {
  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    onSort?.(property, isAsc ? 'desc' : 'asc');
  };

  if (error) {
    return (
      <EmptyState
        title="Error"
        description={error}
        icon="error"
        sx={{ ...sx }}
      />
    );
  }

  return (
    <Paper sx={{ width: '100%', ...sx }}>
      <Box sx={{ position: 'relative' }}>
        {loading && (
          <LinearProgress
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
        <TableContainer>
          <Table {...props}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || 'left'}
                    padding={column.padding || 'normal'}
                    sortDirection={orderBy === column.field ? order : false}
                    sx={column.headerSx}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={handleSort(column.field)}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <EmptyState
                      title={emptyMessage}
                      description="Silakan tambahkan data baru atau ubah filter pencarian"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow
                    hover
                    key={row.id || index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align || 'left'}
                        sx={column.sx}
                      >
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange?.(newPage)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} dari ${count}`
          }
          labelRowsPerPage="Baris per halaman:"
        />
      </Box>
    </Paper>
  );
}

export default DataTable;
