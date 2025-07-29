import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const DrawerPage = () => {
  const navigate = useNavigate();

  function openCashDrawer() {
    // @ts-ignore
    const result = window.ipc.openCashDrawer();
  }

  function openDrawerRaw() {
    // @ts-ignore
    window.ipc.openDrawerRaw();
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={openCashDrawer}>Via librairie</Button>
      <Button onClick={openDrawerRaw}>Via données brutes</Button>
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
