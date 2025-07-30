import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const BarcodeScanPage = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [barcode, setBarcode] = useState<string>("");

  // Pour simuler la recherche de produit (à remplacer plus tard par un appel API)
  const fetchProductInfo = (code: string) => {
    console.log("Recherche produit pour :", code);
    // Exemple fictif
    const fakeProduct = {
      name: "Casque Bell - M",
      price: 89.99,
    };
    alert(`Produit trouvé : ${fakeProduct.name} - ${fakeProduct.price}€`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && barcode.length > 0) {
      fetchProductInfo(barcode);
      setBarcode(""); // Reset après lecture
    }
  };

  useEffect(() => {
    // Autofocus permanent pour capter le scan
    inputRef.current?.focus();
    const interval = setInterval(() => {
      inputRef.current?.focus();
    }, 500); // Si clic accidentel ailleurs, refocus

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 flex flex-col items-center gap-2">
      <h1 className="text-xl font-bold mb-4">Scan code-barres</h1>
      <input
        ref={inputRef}
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border p-2 w-64 text-center text-lg"
        placeholder="Scannez un produit..."
      />
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
