import { useEffect, useMemo, useState, useCallback } from "react";
import {
  DataGrid,
  type GridFilterModel,
  type GridPaginationModel,
  type GridSortModel,
} from '@mui/x-data-grid';
import { Box, IconButton, Slide } from '@mui/material';
import {
  selectProducts,
  selectProductLoading,
  selectTotalProductCount,
} from "../features/products/productSelectors";
import { fetchProducts } from "../features/products/productSlice";
import { getCategories } from "../services/productService";
import { SliderFilter } from "../components/common/SliderFilter";
import { toCapitalizeString } from "../configs/util";
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import FilterPanel from '../components/common/FilterPanel.tsx';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

type GridState = {
  pagination: GridPaginationModel;
  sort: GridSortModel;
  filter: GridFilterModel;
};
const DEFAULT_GRID_STATE: GridState = {
  pagination: { page: 0, pageSize: 10 },
  sort: [{ field: "title", sort: "asc" }],
  filter: { items: [] },
};

const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);
  const totalCount = useAppSelector(selectTotalProductCount);
  const [gridState, setGridState] = useState<GridState>(DEFAULT_GRID_STATE);
  const [columns, setColumns] = useState<any[]>([]);
  const [enableFilter, setEnableFilter] = useState<boolean>(false);

  const apiParams = useMemo(() => {
    const { pagination, sort, filter } = gridState;
    const params: any = {
      limit: pagination.pageSize,
      skip: pagination.page * pagination.pageSize,
      sortBy: sort[0]?.field,
      order: sort[0]?.sort,
    };
    const activeFilter = filter.items.at(-1);
    if (!activeFilter?.value) return params;

    switch (activeFilter.field) {
      case "category":
        params.category = activeFilter.value;
        break;
      case "title":
        if (activeFilter.value.length > 3) {
          params.search = activeFilter.value;
        }
        break;
      case "stock":
        params.minStock = activeFilter.value[0];
        params.maxStock = activeFilter.value[1];
        break;
    }

    return params;
  }, [gridState]);

  useEffect(() => {
    dispatch(fetchProducts(apiParams));
  }, [dispatch, apiParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const categories = await getCategories();
      if (!mounted) return;
      setColumns([
        { field: "title", headerName: "Name", flex: 1 },
        {
          field: "category",
          headerName: "Category",
          width: 160,
          type: "singleSelect",
          valueOptions: categories.map((c: string) => ({
            value: c,
            label: toCapitalizeString(c.replaceAll("-", " ")),
          })),
        },
        { field: "price", headerName: "Price", width: 120 },
        {
          field: "stock",
          headerName: "Stock",
          width: 120,
          filterOperators: [SliderFilter],
        },
      ]);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePaginationChange = useCallback(
    (pagination: GridPaginationModel) =>
      setGridState((s) => ({ ...s, pagination })),
    []
  );

  const handleSortChange = useCallback(
    (sort: GridSortModel) =>
      setGridState((s) => ({ ...s, sort })),
    []
  );

  const handleFilterChange = useCallback(
    (filter: GridFilterModel) =>
      setGridState((s) => ({ ...s, filter: { items: filter.items.slice(-1) } })),
    []
  );

  return (
    <Box>
      <Box fontWeight="600" fontSize="20px">
        Products
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ position: 'relative', zIndex: 1 }}
        width="100%"
        gap="5px"
        justifyContent="right"
        className="p-3"
      >
        <Slide direction="left" in={enableFilter} mountOnEnter unmountOnExit>
          <Box width="inherit">
            <FilterPanel
              search={''}
              category={''}
              price={[]}
              onSearchChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              onCategoryChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              onPriceChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              categories={[]}
            />
          </Box>
        </Slide>
        <IconButton
          aria-label="favorite"
          color="primary"
          title={enableFilter ? 'Clear Filter' : 'Filter'}
          className="float-right !rounded-md !ml-3"
          onClick={() => setEnableFilter((prev) => !prev)}
        >
          {enableFilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
        </IconButton>
      </Box>
      <Box height="75vh">
        <DataGrid
          rows={products}
          columns={columns}
          loading={loading}
          rowCount={totalCount}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          paginationModel={gridState.pagination}
          onPaginationModelChange={handlePaginationChange}
          sortModel={gridState.sort}
          onSortModelChange={handleSortChange}
          filterModel={gridState.filter}
          onFilterModelChange={handleFilterChange}
          pageSizeOptions={[10, 20]}
          disableRowSelectionOnClick
          slotProps={{
            filterPanel:
              {
                filterFormProps: {
                 // columnInputProps: { sx: { display: "none" }, },
                  operatorInputProps: { sx: { display: "none" }, },
                },
              },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductListPage;
