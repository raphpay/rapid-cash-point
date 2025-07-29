import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const BarcodeScanPage = () => {
  const navigate = useNavigate();
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 flex flex-col items-center gap-2">
      <Button onClick={handlePrint}>Impression simple</Button>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Retour
      </Button>
    </div>
  );
};
