import "./App.css";
import { BarcodeScanPage } from "./ui/pages/BarcodeScanPage";
import { HomePage } from "./ui/pages/HomePage";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/barcode-scan" element={<BarcodeScanPage />} />
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
