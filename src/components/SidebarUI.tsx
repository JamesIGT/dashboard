import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MapIcon from '@mui/icons-material/Map';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import SelectorUI from './SelectorUI';

interface SidebarProps {
  city: string;
  onCityChange: (newCity: string) => void;
}

const drawerWidth = 260;

const Sidebar: React.FC<SidebarProps> = ({ city, onCityChange }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0f172a',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          WeatherPro
        </Typography>
        <Typography variant="caption" color="gray">
          Dashboard
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="overline" color="gray">
          Navegación
        </Typography>
        <List>
          <SidebarItem icon={<DashboardIcon />} label="Dashboard" />
          <SidebarItem icon={<ShowChartIcon />} label="Pronóstico" />
          <SidebarItem icon={<MapIcon />} label="Mapas" />
          <SidebarItem icon={<WarningAmberIcon />} label="Alertas" selected />
          <SidebarItem icon={<SettingsIcon />} label="Configuración" />
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="overline" color="gray">
          Selector
        </Typography>
        <SelectorUI value={city} onChange={onCityChange} />
      </Box>
    </Drawer>
  );
};

interface SidebarItemProps {
  icon: React.ReactElement;
  label: string;
  selected?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, selected = false }) => (
  <ListItem disablePadding>
    <ListItemButton selected={selected}>
      <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);

export default Sidebar;
