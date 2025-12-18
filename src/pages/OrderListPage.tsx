import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
  Slide,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { fetchOrders } from '../features/orders/orderSlice';
import {
  selectOrders,
  selectOrderLoading,
  selectTotalOrderCount,
} from '../features/orders/orderSelectors';
import { useDebounce } from '../hooks/useDebounce';
import { filterOrders } from '../configs/utils/orderUtils';
import { QUANTITY_RANGE, Status } from '../configs/constants';
import OrderStatusBadge from '../components/common/OrderStatusBadge';
import FilterPanel from '../components/common/FilterPanel';
import type { Order } from '../features/orders/orderTypes';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';
type OrderBy = 'createdAt' | 'customerName' | 'totalAmount' | 'status';
type OrderFiltersUI = {
  search: string;
  status: OrderStatus | '';
  quantity: [number, number];
};

const OrderListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectOrderLoading);
  const total = useAppSelector(selectTotalOrderCount);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<OrderFiltersUI>({
    search: '',
    status: '',
    quantity: QUANTITY_RANGE,
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  const apiParams = useMemo(
    () => ({
      limit: rowsPerPage,
      skip: page * rowsPerPage,
    }),
    [rowsPerPage, page]
  );

  useEffect(() => {
    dispatch(fetchOrders(apiParams));
  }, [dispatch, apiParams]);

  const filteredOrders = useMemo<Order[]>(() => {
    return filterOrders(orders, {
      ...filters,
      search: debouncedSearch,
    });
  }, [orders, filters, debouncedSearch]);

  const handleSort = useCallback(
    (field: OrderBy) => {
      setOrder((prev) =>
        orderBy === field && prev === 'asc' ? 'desc' : 'asc'
      );
      setOrderBy(field);
    },
    [orderBy]
  );

  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => setPage(newPage),
    []
  );

  const handleRowsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(0);
    },
    []
  );

  return (
    <Box className="order-page">
      <Box fontSize={20} fontWeight={600} mb={1}>
        Orders
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1} mb={2}>
        <Slide direction="left" in={filtersOpen} mountOnEnter unmountOnExit>
          <Box width="100%">
            <FilterPanel
              search={filters.search}
              status={filters.status}
              quantity={filters.quantity}
              statuses={[
                Status.PENDING,
                Status.SHIPPED,
                Status.DELIVERED,
                Status.CANCELLED,
              ]}
              onSearchChange={(v) => setFilters((p) => ({ ...p, search: v }))}
              onStatusChange={(v) =>
                setFilters((p) => ({ ...p, status: v as OrderStatus }))
              }
              onQuantityChange={(v) =>
                setFilters((p: any) => ({ ...p, quantity: v }))
              }
            />
          </Box>
        </Slide>
        <IconButton onClick={() => setFiltersOpen((p) => !p)}>
          {filtersOpen ? <FilterAltOffIcon /> : <FilterAltIcon />}
        </IconButton>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: '60vh' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell
                  sortDirection={orderBy === 'customerName' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'customerName'}
                    direction={order}
                    onClick={() => handleSort('customerName')}
                  >
                    Customer
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell
                  sortDirection={orderBy === 'createdAt' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'createdAt'}
                    direction={order}
                    onClick={() => handleSort('createdAt')}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
              {filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell align="center">
                    <OrderStatusBadge value={order.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{order.totalQuantity}</TableCell>
                  <TableCell align="right">$ {order.total}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      size="small"
                      title="View"
                      className="!rounded-md"
                      onClick={() =>
                        navigate('/orders/' + order.id, { replace: true })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 20]}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsChange}
        />
      </Paper>
    </Box>
  );
};

export default OrderListPage;
