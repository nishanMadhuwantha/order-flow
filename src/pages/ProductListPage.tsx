import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  type GridFilterModel,
  type GridPaginationModel,
  type GridSortModel,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import {
  selectProducts,
  selectProductLoading,
  selectTotalProductCount,
} from '../features/products/productSelectors';
import {
  deleteProduct,
  fetchProducts,
} from '../features/products/productSlice';
import { getCategories } from '../api/productService';
import { SliderFilter } from '../components/common/SliderFilter';
import { toCapitalizeString } from '../configs/utils/util.ts';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../components/common/ConfirmationDialog.tsx';

type GridState = {
  pagination: GridPaginationModel;
  sort: GridSortModel;
  filter: GridFilterModel;
};
const DEFAULT_GRID_STATE: GridState = {
  pagination: { page: 0, pageSize: 10 },
  sort: [{ field: 'title', sort: 'asc' }],
  filter: { items: [] },
};

const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const gridReady = useRef(false);
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);
  const totalCount = useAppSelector(selectTotalProductCount);
  const [gridState, setGridState] = useState<GridState>(DEFAULT_GRID_STATE);
  const [columns, setColumns] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | number>(null);

  const apiParams = useMemo(() => {
    const { pagination, sort, filter } = gridState;
    const params: any = {
      limit: pagination.pageSize,
      skip: pagination.page * pagination.pageSize,
    };
    if (sort && sort[0]) {
      params.sortBy = sort[0]?.field;
      params.order = sort[0]?.sort;
    }
    const activeFilter = filter.items.at(-1);
    if (!activeFilter?.value) return params;
    switch (activeFilter.field) {
      case 'category':
        params.category = activeFilter.value;
        break;
      case 'title':
        if (activeFilter.value.length > 3) {
          params.search = activeFilter.value;
        }
        break;
      case 'price':
        params.minPrice = activeFilter.value[0];
        params.maxPrice = activeFilter.value[1];
        break;
    }

    return params;
  }, [gridState]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(apiParams));
  }, [dispatch, apiParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const categories = await getCategories();
      if (!mounted) return;
      setColumns([
        { field: 'title', headerName: 'Name', flex: 1 },
        {
          field: 'category',
          headerName: 'Category',
          type: 'singleSelect',
          valueOptions: categories.map((c: string) => ({
            value: c,
            label: toCapitalizeString(c.replaceAll('-', ' ')),
          })),
          flex: 1,
        },
        {
          field: 'price',
          headerName: 'Price',
          filterOperators: [SliderFilter],
          width: 150,
        },
        {
          field: 'stock',
          headerName: 'Stock',
          filterable: false,
          width: 150,
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          filterable: false,
          sortable: false,
          width: 100,
          getActions: (params: any) => [
            <GridActionsCellItem
              key="view"
              icon={<VisibilityIcon />}
              label="View"
              title="View"
              color="primary"
              onClick={() => {
                navigate('/products/' + params.id, { replace: true });
              }}
              showInMenu={false}
            />,
            <GridActionsCellItem
              key="delete"
              icon={<DeleteIcon />}
              label="Delete"
              style={{ color: 'red' }}
              onClick={() => {
                setSelectedProduct(params.id);
                setConfirmOpen(true);
              }}
              showInMenu={false}
            />,
          ],
        },
      ]);
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handlePaginationChange = useCallback(
    (pagination: GridPaginationModel) => {
      if (isFirstRender.current) return;
      setGridState((s) => ({ ...s, pagination }));
    },
    []
  );

  const handleSortChange = useCallback((sort: GridSortModel) => {
    // Ignore DataGrid's first empty emission
    if (!gridReady.current && sort.length === 0) return;

    gridReady.current = true;
    setGridState((s) => ({ ...s, sort }));
  }, []);

  const handleFilterChange = useCallback((filter: GridFilterModel) => {
    if (isFirstRender.current) return;
    setGridState((s) => ({
      ...s,
      filter: { items: filter.items.slice(-1) },
    }));
  }, []);

  const handleSave = async () => {
    try {
      if (selectedProduct) {
        await dispatch(deleteProduct(selectedProduct));
      }
      setSelectedProduct(null);
      setConfirmOpen(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Box fontWeight="600" fontSize="20px">
        Products
      </Box>
      <Box height="70vh" marginTop="5px" ref={gridRef} tabIndex={-1}>
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
            filterPanel: {
              filterFormProps: {
                operatorInputProps: { sx: { display: 'none' } },
              },
            },
          }}
        />
      </Box>

      <ConfirmationDialog
        open={confirmOpen}
        title="Confirm Delete"
        description="Are you sure you want to update this product?"
        onConfirm={handleSave}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedProduct(null);
        }}
        onExited={() => {
          gridRef.current?.focus();
        }}
      />
    </Box>
  );
};

export default ProductListPage;
