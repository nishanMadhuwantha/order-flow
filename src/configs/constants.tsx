export const Table_Config = {
	rowsPerPage: 10,
  rowsPerPageOptions: [10, 20, 50],
};

export const Status = {
  PENDING: { key: 'PENDING', name: 'Pending', textColor: '#ffffff', labelColor: '#eeb410' },
  SHIPPED: { key: 'SHIPPED', name: 'Shipped', textColor: '#ffffff', labelColor: '#0099ff' },
  DELIVERED: { key: 'DELIVERED', name: 'Delivered', textColor: '#ffffff', labelColor: '#0e9382' },
  CANCELLED: { key: 'CANCELLED', name: 'Cancelled', textColor: '#ffffff', labelColor: '#f04438' },
};

export const QUANTITY_RANGE: [number, number] = [0, 100];