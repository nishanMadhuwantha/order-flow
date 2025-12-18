import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import type { Order } from '../../features/orders/orderTypes.ts';

export default function ProductCard({ product }: { product: Order }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          height: 160,
          objectFit: "contain",
          p: 1,
          backgroundColor: "#fafafa",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          noWrap
        >
          {product.title}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2">
            Price: <b>${product.price}</b>
          </Typography>
          <Typography variant="body2">
            Qty: <b>{product.quantity}</b>
          </Typography>
        </Box>
        <Box mt={1}>
          <Chip
            size="small"
            color="primary"
            label={`Total: $${product.total}`}
          />
        </Box>
        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
          {product.discountPercentage && (
            <Chip
              size="small"
              color="success"
              label={`${product.discountPercentage}%`}
            />
          )}
          {product.discountedTotal && (
            <Chip
              size="small"
              color="warning"
              label={`After: $${product.discountedTotal}`}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
