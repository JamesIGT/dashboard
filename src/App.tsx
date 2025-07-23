import { useState } from 'react';
import './App.css';

import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useDataFetcher from './functions/DataFetcher';

import Sidebar from './components/SidebarUI';

import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  Toolbar,
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

const drawerWidth = 240;

const CITY_CONFIG: Record<string, { latitude: number; longitude: number; timezone: string }> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862, timezone: 'America/Guayaquil' },
  quito: { latitude: -0.2298, longitude: -78.525, timezone: 'America/Guayaquil' },
  manta: { latitude: -0.9494, longitude: -80.7314, timezone: 'America/Guayaquil' },
  cuenca: { latitude: -2.9005, longitude: -79.0045, timezone: 'America/Guayaquil' },
};

function App() {
  const [city, setCity] = useState<string>('');
  const config = city ? CITY_CONFIG[city] : null;

  const dataFetcherOutput = useDataFetcher(
    config?.latitude ?? null,
    config?.longitude ?? null,
    config?.timezone ?? null
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          <Sidebar city={city} onCityChange={setCity} />
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12}}>
              <HeaderUI />
            </Grid>

            <Grid size={{ xs: 12}}>
              <AlertUI description="No se preveen lluvias" />
            </Grid>

            <Grid size={{ xs: 12}}>
              <Typography variant="h5" gutterBottom>
                {city ? `Clima actual en ${city.charAt(0).toUpperCase() + city.slice(1)}` : 'Seleccione una ciudad'}
              </Typography>
            </Grid>

            {/* Indicadores */}
            {dataFetcherOutput.loading && <p>Cargando datos...</p>}
            {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
            {dataFetcherOutput.data && (
              <>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title="Temperatura (2m)"
                    description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title="Temperatura aparente"
                    description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title="Velocidad del viento"
                    description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title="Humedad relativa"
                    description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
                  />
                </Grid>
              </>
            )}

            {/* Chart + Table */}
            <Grid size={{ xs: 12, md: 6 }} >
              <ChartUI dataFetcherOutput={dataFetcherOutput} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TableUI dataFetcherOutput={dataFetcherOutput} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
