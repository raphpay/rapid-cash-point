import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const BarcodeScanPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col">
      <p>Barcode scan page</p>
      <Button variant="ghost" onClick={() => navigate("/")}>
        Retour
      </Button>
    </div>
  );
};
