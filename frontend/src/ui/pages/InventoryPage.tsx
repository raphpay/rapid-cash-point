import { useState } from "react";
import {
  parseCSV,
  transformData,
  uploadToFirebase,
} from "../../business-logic/BikeImporter";
import { CSVUploader } from "../components/CSVUploader";

export const InventoryPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleFileParsed = async (csvText: string) => {
    const rawData = parseCSV(csvText);
    const data = transformData(rawData);
    console.log("end", data);
    await uploadToFirebase(data);
    setMessage("Importation terminée avec succès");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">
        Importateur d'inventaire de vélos
      </h1>
      <CSVUploader onFileParsed={handleFileParsed} />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};
