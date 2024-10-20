import { Route, Routes } from "react-router-dom";
import Login from "../routes/login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;