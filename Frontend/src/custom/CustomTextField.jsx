import React from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomTextField = ({ label, value, onChange, id, name, type = "text", ...props }) => {
  const theme = useTheme(); // Obtener el tema global

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      color="primary"
      autoComplete={name}
      autoFocus
      sx={{
        mb: 2,
        input: { color: 'white' },  // Color del texto
        label: { color: theme.palette.primary.main },  // Color de la etiqueta
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.main, // Color del borde en estado normal
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main, // Color del borde al pasar el mouse
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main, // Color del borde cuando está enfocado
          },
        },
        // Desactivar el fondo de autocompletar
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px rgba(202, 202, 202, 0.12) inset', // Cambia #000 al color de fondo deseado
          WebkitTextFillColor: 'white', // Asegura que el texto siga siendo visible
          transition: 'background-color 5000s ease-in-out 0s', // Truco para evitar el cambio de color en autocompletar
        },
      }}
      {...props} // Propiedades adicionales
    />
  );
};

export default CustomTextField;
