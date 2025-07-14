import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  dataFetcherOutput: {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
  };
}

export default function TemperaturaTableUI({ dataFetcherOutput }: TableUIProps) {
  const { data, loading, error } = dataFetcherOutput;

  if (loading) return <Typography>Cargando datos del clima...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!data) return <Typography>No hay datos disponibles.</Typography>;

  // Agrupar temperaturas por día
  const tempsPorDia: { [fecha: string]: number[] } = {};

  data.hourly.time.forEach((fechaHora, i) => {
    const fecha = fechaHora.slice(0, 10);
    if (!tempsPorDia[fecha]) tempsPorDia[fecha] = [];
    tempsPorDia[fecha].push(data.hourly.temperature_2m[i]);
  });

  const tablaDatos = Object.entries(tempsPorDia).map(([fecha, temps]) => {
    const promedio = temps.reduce((a, b) => a + b, 0) / temps.length;
    return { fecha, temperatura: Math.round(promedio * 10) / 10 };
  });

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxWidth: 600, 
        margin: 'auto', 
        mt: 4, 
        bgcolor: '#121212', 
        color: '#fff', 
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Table aria-label="tabla de temperaturas" sx={{ color: '#fff' }}>
        <TableHead>
          <TableRow sx={{ bgcolor: '#000' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">
              Temperatura (°C)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tablaDatos.map(({ fecha, temperatura }) => (
            <TableRow
              key={fecha}
              sx={{
                bgcolor: '#1e1e1e',
                '&:nth-of-type(odd)': { bgcolor: '#2c2c2c' },
                '&:hover': { bgcolor: '#3a3a3a' },
              }}
            >
              <TableCell component="th" scope="row" sx={{ color: '#fff' }}>
                {fecha}
              </TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                {temperatura.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
