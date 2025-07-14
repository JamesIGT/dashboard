import { useState } from 'react'
import './App.css'

import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useDataFetcher from './functions/DataFetcher';

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
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      <Grid>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI value={city} onChange={setCity} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 12 }}>
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>
            {/* Indicadores con datos obtenidos */}
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={
                  dataFetcherOutput.data.current.temperature_2m + ' ' + dataFetcherOutput.data.current_units.temperature_2m
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={
                  dataFetcherOutput.data.current.apparent_temperature + ' ' + dataFetcherOutput.data.current_units.apparent_temperature
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={
                  dataFetcherOutput.data.current.wind_speed_10m + ' ' + dataFetcherOutput.data.current_units.wind_speed_10m
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={
                  dataFetcherOutput.data.current.relative_humidity_2m + ' ' + dataFetcherOutput.data.current_units.relative_humidity_2m
                }
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ChartUI dataFetcherOutput={dataFetcherOutput} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        {/* <TableUI dataFetcherOutput={dataFetcherOutput} /> */}
        <TableUI dataFetcherOutput={dataFetcherOutput} />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  )
}

export default App;
