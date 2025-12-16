import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface TopbarProps {
  isMobile: boolean;
  collapsed: boolean;
  onToggleSidebar: () => void;
  onMobileMenu: () => void;
  mode: "light" | "dark";
  toggleMode: () => void;
}

const Topbar = ({
                  isMobile,
                  collapsed,
                  onToggleSidebar,
                  onMobileMenu,
                  mode,
                  toggleMode,
                }: TopbarProps) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={isMobile ? onMobileMenu : onToggleSidebar}
          >
            {isMobile ? (
              <MenuIcon />
            ) : collapsed ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>

          <Typography variant="h6" fontWeight={600}>
            Product & Order Management
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
