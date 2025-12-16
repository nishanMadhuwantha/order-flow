import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useThemeMode } from "../providers/ThemeModeProvider";

const AppLayout = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Topbar
        isMobile={isMobile}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
        onMobileMenu={() => setMobileOpen(true)}
        mode={mode}
        toggleMode={toggleMode}
      />
      <Sidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: 8,
          overflowY: "auto",
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
