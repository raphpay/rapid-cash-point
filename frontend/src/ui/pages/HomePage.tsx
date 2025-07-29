import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    window.ipc.send("set-title", "Ma caisse");
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        onClick={() => {
          navigate("/barcode-scan");
        }}
      >
        Lecture de code barre
      </Button>
      <Button
        onClick={() => {
          navigate("/ticket-printing");
        }}
      >
        Impression de ticket
      </Button>
      <Button onClick={() => {}}>Ouverture tiroir</Button>
    </div>
  );
};
