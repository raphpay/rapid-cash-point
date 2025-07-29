import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { BarcodeScanPage } from "./ui/pages/BarcodeScanPage";
import { HomePage } from "./ui/pages/HomePage";
import { ReceiptPrintingPage } from "./ui/pages/ReceiptPrintingPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/barcode-scan" element={<BarcodeScanPage />} />
      <Route path="/ticket-printing" element={<ReceiptPrintingPage />} />
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
