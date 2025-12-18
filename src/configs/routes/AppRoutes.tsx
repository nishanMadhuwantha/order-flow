import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./routePaths";
import { Box, CircularProgress } from "@mui/material";
import AppLayout from '../../components/layout/AppLayout.tsx';

const ProductListPage = lazy(() => import("../../pages/ProductListPage"));
const ProductDetailsPage = lazy(() => import("../../pages/ProductDetailsPage"));
const OrderListPage = lazy(() => import("../../pages/OrderListPage"));
const OrderDetailsPage = lazy(() => import("../../pages/OrderDetailsPage"));

const PageLoader = () => (
  <Box className="flex items-center justify-center h-[60vh]">
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.PRODUCTS} replace />}
        />
        <Route element={<AppLayout />}>
          <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
          <Route
            path={ROUTES.PRODUCT_DETAILS}
            element={<ProductDetailsPage />}
          />
          <Route path={ROUTES.ORDERS} element={<OrderListPage />} />
          <Route
            path={ROUTES.ORDER_DETAILS}
            element={<OrderDetailsPage />}
          />
        </Route>
        <Route
          path="*"
          element={<Navigate to={ROUTES.PRODUCTS} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;