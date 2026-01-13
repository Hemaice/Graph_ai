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

  const stopDraw = () => {
    setIsDrawing(false);
  };

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

    if (tab === "upload" && selectedFile) {
      formData.append("image", selectedFile);
      await uploadToAPI(formData);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "drawing.png", { type: "image/png" });
      formData.append("image", file);
      uploadToAPI(formData);
    });
  };

  const uploadToAPI = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://handwritten-digital-data-backend.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      console.log("API Response:", data);

      const openness = Number(((data.Openness || 0)).toFixed(3));
      const conscientiousness = Number(((data.Conscientiousness || 0)).toFixed(3));
      const extraversion = Number(((data.Extraversion || 0)).toFixed(3));
      const agreeableness = Number(((data.Agreeableness || 0)).toFixed(3));
      const neuro_raw = Number(((data.Neuroticism || 0)).toFixed(3));
      // Use backend dominant directly
      const backendDominant = data.dominant_trait || "Unknown";

      setResults({
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism: neuro_raw,
        dominant_trait: backendDominant,
      });



    } catch (err) {
      setError("Failed to process image. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* TAB SWITCH */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => {
              setTab("upload");
              setResults(null);
            }}
            className={`px-6 py-3 rounded-l-lg border ${tab === "upload" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            Upload Image
          </button>
          <button
            onClick={() => {
              setTab("draw");
              setResults(null);
            }}
            className={`px-6 py-3 rounded-r-lg border ${tab === "draw" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            Draw Handwriting
          </button>
        </div>

        {/* UPLOAD TAB */}
        {tab === "upload" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border">
            {!selectedImage ? (
              <div
                className={`p-12 text-center border-2 border-dashed rounded-xl ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileSelect(e.dataTransfer.files[0]);
                }}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-700 mb-3">Drag & drop handwriting image</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow"
                >
                  Browse
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Preview</h3>
                  <button
                    className="p-2"
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedFile(null);
                    }}
                  >
                    <X />
                  </button>
                </div>
                <img src={selectedImage} className="w-full rounded-lg mb-4" />
              </div>
            )}
          </div>
        )}

        {/* DRAW TAB */}
        {tab === "draw" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border">

            <div className="flex gap-4 mb-4">
              <button
                className={`p-3 rounded-lg border ${tool === "pen" ? "bg-blue-600 text-white" : ""}`}
                onClick={() => setTool("pen")}
              >
                <Pen />
              </button>

              <button
                className={`p-3 rounded-lg border ${tool === "eraser" ? "bg-blue-600 text-white" : ""}`}
                onClick={() => setTool("eraser")}
              >
                <Eraser />
              </button>

              <button className="p-3 border rounded-lg" onClick={undo}>
                <Undo2 />
              </button>

              <button className="p-3 border rounded-lg" onClick={redo}>
                <Redo2 />
              </button>

              <button className="p-3 border rounded-lg" onClick={clearCanvas}>
                <RotateCcw />
              </button>

              <div className="flex items-center border rounded-lg px-3">
                <span className="mr-2">Size</span>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={penSize}
                  onChange={(e) => setPenSize(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center border rounded-lg px-3">
                <input
                  type="color"
                  value={penColor}
                  onChange={(e) => setPenColor(e.target.value)}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <canvas
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              className="border w-full rounded-lg bg-white touch-none"
            ></canvas>
          </div>
        )}

        {/* ANALYZE BUTTON */}
        <div className="text-center mt-10">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg text-xl disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Analyzing...
              </span>
            ) : (
              "Analyze Handwriting"
            )}
          </button>
        </div>

        {/* RESULTS */}
        {results && (
          <div className="mt-12 bg-white p-8 rounded-xl shadow-xl border">

            <h2 className="text-center text-2xl font-bold mb-6">
              Dominant Trait
            </h2>

            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 text-white font-semibold text-xl rounded-full
                shadow-md"
                style={{
                  background: "linear-gradient(to right, #1e3c72, #2a5298)"
                }}
              >
                {results.dominant_trait}
              </div>
            </div>

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
