import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  CssBaseline
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2C74B3',
    },
    background: {
      default: '#0a2647',
      paper: '#144272',
    },
  },
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ fontSize: 40, mr: 1, color: 'white' }} />
          <Typography variant="h4" component="h1" fontWeight="bold" color="white">
            Mexplore
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            margin="dense" // Reduce el margen entre los campos
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }} // Menor margen abajo
          />
          <TextField
            margin="dense" // Reduce el margen vertical entre los campos
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1.5 }} // Un poco de espacio antes del botón
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1.5, mb: 2 }} // Espacio arriba para separarlo del último campo
          >
            Iniciar sesión
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="#" variant="body2" display="block" mb={1}>
              Olvidé contraseña
            </Link>
            <Link href="#" variant="body2">
              Crear cuenta
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
