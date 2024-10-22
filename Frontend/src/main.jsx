import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/700.css';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./index.css";  // Importamos los estilos globales

// Definir el tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#F3E8E8', // blanco plateadito
    },
    secondary: {
      main: '#007BFF', // azul para los botones
    },
    tertiary: {
      main: 'rgba(202, 202, 202, 0.12)', // Gris con opacidad del 12%
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Orbitron', 'sans-serif'].join(','), // Definir fuentes globales
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseteo de estilos globales */}
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
