import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  Rating,
  CircularProgress,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import {
  fetchProductById,
  patchProduct,
} from "../features/products/productSlice";
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import ConfirmationDialog from '../components/common/ConfirmationDialog.tsx';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading }: any = useAppSelector(
    (state) => state.products
  );
  const [stock, setStock] = useState(0);
  const [active, setActive] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!selectedProduct) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStock(selectedProduct.stock);
    setActive(selectedProduct.active ?? true);
  }, [selectedProduct])

  if (loading || !selectedProduct) {
    return <CircularProgress />;
  }

  const handleSave = () => {
    dispatch(
      patchProduct({
        id: selectedProduct.id,
        payload: { stock, active },
      })
    );
    setConfirmOpen(false);
  };

  return (
    <Box p={3} maxWidth={1000}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5">{selectedProduct.title}</Typography>
          <Typography color="text.secondary">
            SKU: {selectedProduct.sku}
          </Typography>
        </Grid>
        <Grid sx={{xs: 12}}>
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            width="100%"
          />
          <Box display="flex" gap={1} mt={2} flexWrap="wrap">
            {selectedProduct.images?.map((img: string, index: number) => (
              <img key={img} src={img} alt={selectedProduct.title + index} width={60} />
            ))}
          </Box>
        </Grid>

        {/* Details */}
        <Grid sx={{xs: 12, md: 7}}>
          <Box display="flex" gap={2} alignItems="center">
          <Typography variant="h6" mt={2}>
            Price: ${selectedProduct.price}
          </Typography>
          <Chip
            label={selectedProduct.availabilityStatus}
            color={selectedProduct.stock > 0 ? "success" : "error"}
            sx={{ mt: 1 }}
          />
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Rating
              value={selectedProduct.rating}
              readOnly
              precision={0.5}
            />
            <Typography>
              ({selectedProduct.reviews?.length ?? 0} reviews)
            </Typography>
          </Box>





          <Typography mt={2} fontSize='16px'>{selectedProduct.description}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Meta Info */}
          <Grid container spacing={2}>
            {/*<Grid sx={{xs: 6, md: 6}}>Brand:{selectedProduct.brand}</Grid>*/}
            <Grid sx={{xs: 6, md: 6}}><b>Brand:</b> {selectedProduct.brand}</Grid>
            <Grid sx={{xs: 6, md: 6}}><b>Category:</b> {selectedProduct.category}</Grid>
            <Grid sx={{xs: 6, md: 6}}>
              <b>Warranty:</b> {selectedProduct.warrantyInformation}
            </Grid>
            <Grid sx={{xs: 6, md: 6}}>
              <b>Shipping:</b> {selectedProduct.shippingInformation}
            </Grid>
            <Grid sx={{xs: 6, md: 6}}>
              <b>Return Policy:</b> {selectedProduct.returnPolicy}
            </Grid>
            <Grid sx={{xs: 6, md: 6}}><b>Weight:</b> {selectedProduct.weight} kg</Grid>
            <Grid sx={{xs: 6, md: 6}}>
              <b>Dimensions:</b> {selectedProduct.dimensions?.width} ×{" "}
              {selectedProduct.dimensions?.height} ×{" "}
              {selectedProduct.dimensions?.depth}
            </Grid>
          </Grid>

          <Box mt={2} display="flex" gap={1} flexWrap="wrap">
            {selectedProduct.tags?.map((tag: any) => (
              <Chip size='small' key={tag} label={tag} />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Editable */}
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Stock Quantity"
              type="number"
              size='small'
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />

            <Box display="flex" alignItems="center">
              <Typography>Inactive</Typography>
              <Switch
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <Typography>Active</Typography>
            </Box>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setConfirmOpen(true)}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ConfirmationDialog
        open={confirmOpen}
        title="Confirm Update"
        description="Are you sure you want to update this product?"
        onConfirm={handleSave}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
}
