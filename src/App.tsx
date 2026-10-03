import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import IngredientPage from "./components/ingredient/IngredientPage";
import StockMovementsPage from "./components/stockmovements/StockMovementsPage";
import DashboardLayout from "./layout/DashboardLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <DashboardLayout>
              <Navigate
                to="/inventory"
                replace
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/inventory"
          element={
            <DashboardLayout>
              <IngredientPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <div />
            </DashboardLayout>
          }
        />

        <Route
          path="/stock-movements"
          element={
            <DashboardLayout>
              <StockMovementsPage/>
            </DashboardLayout>
          }
        />

        <Route
          path="/purchase-orders"
          element={
            <DashboardLayout>
              <div />
            </DashboardLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <div />
            </DashboardLayout>
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/inventory"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;