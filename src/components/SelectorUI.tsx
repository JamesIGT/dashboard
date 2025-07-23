import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

interface SelectorUIProps {
  value: string;
  onChange: (newCity: string) => void;
}

export default function SelectorUI({ value, onChange }: SelectorUIProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: '#1e293b',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        color: '#fff',
      }}
    >
      <InputLabel id="city-select-label" sx={{ color: '#cbd5e1' }}>
        Ciudad
      </InputLabel>
      <Select
        labelId="city-select-label"
        id="city-selector"
        label="Ciudad"
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: '#0f172a',
          color: '#fff',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#334155',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b82f6',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b82f6',
          },
          svg: {
            color: '#cbd5e1',
          },
        }}
      >
        <MenuItem disabled value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>
      {value && (
        <Typography
          variant="body2"
          sx={{
            color: '#cbd5e1',
            marginTop: 2,
            textAlign: 'center',
          }}
        >
          Información del clima en{' '}
          <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: '#fff' }}>
            {value}
          </span>
        </Typography>
      )}
    </FormControl>
  );
}
