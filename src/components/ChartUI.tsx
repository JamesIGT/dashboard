import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes'; // Asegúrate de tener esto

interface ChartUIProps {
  dataFetcherOutput: {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
  };
}

export default function ChartUI({ dataFetcherOutput }: ChartUIProps) {
  const { data, loading, error } = dataFetcherOutput;

  if (loading) return <Typography>Cargando datos del clima...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!data) return <Typography>No hay datos disponibles.</Typography>;

  // Agrupar temperaturas por día
  const tempsPorDia: { [fecha: string]: number[] } = {};

  data.hourly.time.forEach((fechaHora, i) => {
    const fecha = fechaHora.slice(0, 10); // YYYY-MM-DD
    if (!tempsPorDia[fecha]) {
      tempsPorDia[fecha] = [];
    }
    tempsPorDia[fecha].push(data.hourly.temperature_2m[i]);
  });

  // Calcular el promedio de temperatura por día
  const etiquetas = Object.keys(tempsPorDia);
  const valores = etiquetas.map((fecha) => {
    const temps = tempsPorDia[fecha];
    const promedio = temps.reduce((a, b) => a + b, 0) / temps.length;
    return Math.round(promedio * 10) / 10;
  });

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Temperatura promedio diaria
      </Typography>
      <LineChart
        height={300}
        series={[
          {
            data: valores,
            label: 'Temperatura (°C)',
            color: '#1976d2',
          },
        ]}
        xAxis={[
          {
            scaleType: 'band',
            data: etiquetas,
            label: 'Día',
          },
        ]}
      />
    </>
  );
}
