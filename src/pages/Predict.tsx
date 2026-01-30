import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  Loader2,
  Pen,
  Eraser,
  RotateCcw,
  Undo2,
  Redo2,
} from 'lucide-react';

interface PredictionResult {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  dominant_trait: string;
}

export default function Predict() {
  const [tab, setTab] = useState<"upload" | "draw">("upload");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setHistory((prev) => [...prev, canvas.toDataURL()]);
      setRedoStack([]);
    }
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const prev = [...history];
    const last = prev.pop();

    if (canvas && ctx && last) {
      setRedoStack((r) => [...r, canvas.toDataURL()]);
      setHistory(prev);
      const img = new Image();
      img.src = last;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const next = [...redoStack];
    const state = next.pop();

    if (canvas && ctx && state) {
      setRedoStack(next);
      setHistory((h) => [...h, canvas.toDataURL()]);
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      saveCanvasState();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    }
  }, []);

  const getCoords = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    saveCanvasState();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoords(e);
    ctx.strokeStyle = tool === "pen" ? penColor : "#ffffff";
    ctx.lineWidth = penSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResults(null);
    setError(null);

    const formData = new FormData();

    if (tab === "upload") {
      if (!selectedFile) {
        setError("Please upload an image.");
        setIsAnalyzing(false);
        return;
      }
      formData.append("image", selectedFile);
      await uploadToAPI(formData);
      return;
    }

    if (tab === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "drawing.png", { type: "image/png" });
        formData.append("image", file);
        await uploadToAPI(formData);
      });
    }
  };

  const uploadToAPI = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://handwriting-backend-api.onrender.com/predict",
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      setResults({
        openness: Number((data.Openness || 0).toFixed(3)),
        conscientiousness: Number((data.Conscientiousness || 0).toFixed(3)),
        extraversion: Number((data.Extraversion || 0).toFixed(3)),
        agreeableness: Number((data.Agreeableness || 0).toFixed(3)),
        neuroticism: Number((data.Neuroticism || 0).toFixed(3)),
        dominant_trait: data.dominant_trait || "Unknown",
      });
    } catch {
      setError("Failed to process image. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* RESULTS */}
        {results && (
          <div className="mt-12 bg-white p-8 rounded-xl shadow-xl border">

            {/* Dominant Trait UI REMOVED */}

            <table className="w-full border">
              <tbody>
                <tr><td className="p-4 border">Openness</td><td className="p-4 border">{results.openness}%</td></tr>
                <tr><td className="p-4 border">Conscientiousness</td><td className="p-4 border">{results.conscientiousness}%</td></tr>
                <tr><td className="p-4 border">Extraversion</td><td className="p-4 border">{results.extraversion}%</td></tr>
                <tr><td className="p-4 border">Agreeableness</td><td className="p-4 border">{results.agreeableness}%</td></tr>
                <tr><td className="p-4 border">Neuroticism</td><td className="p-4 border">{results.neuroticism}%</td></tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
