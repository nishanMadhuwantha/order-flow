# Product Inventory & Order Management Dashboard - ( Order Flow )

## Technical Assessment – React SSE

A mid-scale **React + TypeScript** dashboard application for managing **Products** and **Orders**, built using **Redux Toolkit**, **Material UI**, and a scalable, feature-based architecture.

---

## 📌 Project Overview

The application provides:

- Product inventory management with filtering and pagination
- Product detail management with update functionality
- Order management with status visualization
- Centralized state management using Redux Toolkit
- A maintainable and scalable folder structure

---

## 🧩 Functional Requirements Implemented

### 1. Product List Page

- Fetches products from a dummy/mock API
- Displays products using **Material UI DataGrid**
- Filters implemented - **inbuild from DataGrid library**:
  - Search by product name (text)
  - Filter by category (dropdown)
  - Price range filter (slider)
- Structure allows easy migration to server-side pagination

---

### 2. Product Details Page

- Navigates to details page on product selection
- Displays:
  - Product image
  - Price
  - Description
  - Stock quantity
  - Rating , etc...
- Features:
  - Update stock quantity
  - Toggle product status (**Active / Inactive**)
- Technical implementation:
  - Controlled forms
  - API `PUT / PATCH` requests
  - Redux async thunks for updates
- Back to products feature also there

---

### 3. Order List Page

- Fetches orders from a separate API endpoint
- Displays data using **Material UI Table**
- Features:
  - Sorting
  - Filtering - **external filters**
  - Status badges: - Pending, Shipped, Delivered, Cancelled
- Orders are fully managed through Redux Toolkit

---

### 4. Order Details Page

- Navigates to details page on order selection
- Displays:
  - Customer name
  - Prices and discounts
  - Quantities details
  - Related products list from card , etc...
- Back to orders feature also there

---

## 🎨 UI / UX

### Layout

- Material UI based layout
- Top navigation bar
- Left sidebar navigation
- Responsive and consistent design

---

## 🛠 Tech Stack

| Category           | Technology         |
| ------------------ | ------------------ |
| Framework          | React + TypeScript |
| Build Tool         | Vite               |
| State Management   | Redux Toolkit      |
| UI Library         | Material UI        |
| Data Grid          | MUI X DataGrid     |
| API Handling       | createAsyncThunk   |
| Alert message      | notistack          |
| additional styling | tailwindcss        |
| Linting            | ESLint             |
| Formatting         | Prettier           |

---

## 📁 Folder Structure

```txt
order-flow/
├── public/
├── src/
│   ├── api/                     # API client configuration
│   ├── app/
│   │   ├── store.ts             # Redux store setup
│   │   └── notificationListener.ts
│   ├── assets/                  # Static assets
│   ├── components/
│   │   ├── common/              # Shared reusable components
│   │   ├── layout/              # Layout components (AppLayout, Navbar, Sidebar)
│   │   ├── providers/           # Application providers
│   │   └── theme/               # MUI theme configuration
│   ├── configs/
│   │   ├── mapper/              # API → UI data mapping
│   │   ├── routes/              # Route definitions
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Utility helpers
│   │   └── constants.tsx        # Global constants
│   ├── features/
│   │   ├── products/            # Product feature (slice, types, selectors)
│   │   └── orders/              # Order feature (slice, types, selectors)
│   ├── hooks/                   # Custom reusable hooks
│   ├── pages/                   # Page level components
│   ├── styles/                  # Global styles
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .env.example
├── eslint.config.mjs
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

## 🚀 Running the Application

### 1. Clone and Install dependencies

`bash npm install`

### 2. Setup environment variables

`cp .env.example .env`

Edit .env if required:

```
VITE_API_BASE_URL=https://dummyjson.com
```

### 3. Start development server

`npm run dev`

### 4. Open in browser

```
http://localhost:5173/
```

---

## 👤 Author - **`Nishan Madhuwantha`**

---
