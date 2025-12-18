import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { fetchOrderById } from '../features/orders/orderSlice.ts';
import ProductCard from '../components/common/ProductCard.tsx';
import OrderStatusBadge from '../components/common/OrderStatusBadge.tsx';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedOrder, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (id) dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  if (loading || !selectedOrder) {
    return <CircularProgress />;
  }

  return (
    <Box p={3} maxWidth={1000}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <IconButton onClick={() => navigate('/orders')}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box>
          <Typography variant="h5">Order #{selectedOrder.id}</Typography>
          <Typography color="text.secondary">
            Created: {selectedOrder.createdAt}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={1}>
        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Customer:</b> {selectedOrder.customerName}
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <OrderStatusBadge value={selectedOrder.status} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Total Products:</b> {selectedOrder.totalProducts}
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Total Quantity:</b> {selectedOrder.totalQuantity}
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Total Amount:</b> ${selectedOrder.total}
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography color="success.main">
            <b>Discounted Total:</b> ${selectedOrder.discountedTotal}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" mb={2}>
        Ordered Products
      </Typography>
      <Grid container spacing={2}>
        {selectedOrder.products.map((product: any) => (
          <Grid size={{ xs: 3 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
