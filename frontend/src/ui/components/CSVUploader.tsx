import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface CSVUploaderProps {
  onFileParsed: (value: string) => void;
}

export const CSVUploader: React.FC<CSVUploaderProps> = ({ onFileParsed }) => {
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      onFileParsed(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <p>Inventory Page</p>

      <input type="file" accept=".csv" onChange={handleFile} />

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
