import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useThemeMode } from '../providers/ThemeModeProvider';
import { ROUTE_TITLES } from '../../configs/routes/routePaths.ts';

const AppLayout = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  useEffect(() => {
    document.title = ROUTE_TITLES[location.pathname] ?? 'Order Flow';
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
          overflowY: 'auto',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
