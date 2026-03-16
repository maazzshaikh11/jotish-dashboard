import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/list" element={<List />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;