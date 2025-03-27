import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./components/Layout";
import Configuration from "./components/Configuration/Configuration";
import InvoiceGenerator from "./components/InvoiceGenerator/InvoiceGenerator";
import Clients from "./components/Clients/Clients";
import ClientCalendar from "./components/ClientCalendar/ClientCalendar";
import GeneralCalendar from "./components/GeneralCalendar/GeneralCalendar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="clients" element={<Clients />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="general-calendar" element={<GeneralCalendar />} />
            <Route path="calendar/:id" element={<ClientCalendar />} />
            <Route path="invoice/:id" element={<InvoiceGenerator />} />
            {/* <Route path="calendar" element={<ClientCalendar />} /> */}
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
