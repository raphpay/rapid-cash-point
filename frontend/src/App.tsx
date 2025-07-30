import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { BarcodeScanPage } from "./ui/pages/BarcodeScanPage";
import { DrawerPage } from "./ui/pages/DrawerPage";
import { HomePage } from "./ui/pages/HomePage";
import { InventoryPage } from "./ui/pages/InventoryPage";
import POSPage from "./ui/pages/POSPage";
import { ReceiptPrintingPage } from "./ui/pages/ReceiptPrintingPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/barcode-scan" element={<BarcodeScanPage />} />
      <Route path="/ticket-printing" element={<ReceiptPrintingPage />} />
      <Route path="/drawer" element={<DrawerPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/pos" element={<POSPage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
