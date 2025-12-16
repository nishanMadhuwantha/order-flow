import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ROUTES } from "../../configs/routes/routePaths";

const drawerWidth = 260;
const collapsedWidth = 80;

interface SidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
}

const Sidebar = ({
                   isMobile,
                   mobileOpen,
                   collapsed,
                   onClose,
                 }: SidebarProps) => {
  const width = collapsed ? collapsedWidth : drawerWidth;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          overflowX: "hidden",
          transition: "width 0.25s ease",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
        {!collapsed && (
          <Typography variant="h6" fontWeight={700}>
            Order Flow
          </Typography>
        )}
      </Toolbar>

      <List sx={{ px: 1 }}>
        <ListItemButton
          component={NavLink}
          to={ROUTES.PRODUCTS}
          onClick={isMobile ? onClose : undefined}
          sx={{
            borderRadius: '4px',
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}
          >
            <Inventory2Icon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Products" />}
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to={ROUTES.ORDERS}
          onClick={isMobile ? onClose : undefined}
          sx={{
            borderRadius: '4px',
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}
          >
            <ShoppingCartIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Orders" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
