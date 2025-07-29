import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        onClick={() => {
          navigate("/barcode-scan");
        }}
      >
        Lecture de code barre
      </Button>
      <Button onClick={() => {}}>Impression de ticket</Button>
      <Button onClick={() => {}}>Ouverture tiroir</Button>
    </div>
  );
};
