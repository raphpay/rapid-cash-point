import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const ReceiptPrintingPage = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handlePrint = () => {
    window.print();
    setError(null);
  };

  // example in a React component
  const handlePrintTicket = async () => {
    const sampleTicket = {
      items: [
        { name: "Casque Bell", quantity: 1, price: 49.99 },
        { name: "Gants Fox", quantity: 1, price: 29.99 },
      ],
      total: 79.98,
    };

    try {
      // @ts-ignore
      const result = await window.ipc.printTicket(sampleTicket);
      if (result.success === false) {
        setError(result.error);
      }
    } catch (error) {
      setError("Error");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center gap-2">
      <Button onClick={handlePrint}>Impression simple</Button>
      <Button onClick={handlePrintTicket}>Impression ticket</Button>
      {error && <p className="text-red-500">{error}</p>}
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
