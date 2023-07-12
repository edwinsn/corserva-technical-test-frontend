import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Nav from "./Nav";

const SalesOrdersDashboard = lazy(() =>
  import("./Routes/SaleOrdersDashboard/index.js")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NewSaleOrder = lazy(() => import("./Routes/NewSaleOrder"));
const EditOrder = lazy(() => import("./Routes/EditSalesOrder"));

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Suspense>
        <Routes>
          <Route path="/" element={<SalesOrdersDashboard />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/new-sale-order" element={<NewSaleOrder />} />
          <Route path="/edit-order/:id" element={<EditOrder />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
