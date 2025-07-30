import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const InventoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-2">
      <p>Inventory Page</p>
      <Button
        className="col-span-2"
        variant="ghost"
        onClick={() => {
          navigate("/");
        }}
      >
        Retour
      </Button>
    </div>
  );
};
