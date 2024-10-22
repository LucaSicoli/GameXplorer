import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  CssBaseline,
  Container,
  useTheme
} from '@mui/material';
import useLogin from '../hooks/useLogin.js';
import CustomTextField from '../custom/CustomTextField.jsx';

function Login() {
  const theme = useTheme(); // Accede al tema usando useTheme()

  const {
    email, setEmail,
    password, setPassword,
    handleLogin,
  } = useLogin();

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <img 
            src="/assets/gameXplore_logo.png"
            alt="GameXplore Logo"
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 8,
            borderRadius: 10,
            boxShadow: 3,
            backgroundColor: theme.palette.tertiary.main,
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ fontFamily: 'Orbitron, sans-serif', mb: 5, color: 'white' }}
          >
            Login
          </Typography>
          <CustomTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />

<CustomTextField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
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
    </Container>
  );
}

export default Login;
