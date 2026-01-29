import { useRef, useState } from "react";

export default function Predict() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("upload"); // upload | digital
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  /* ---------- DIGITAL WRITING ---------- */
  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /* ---------- PREDICT (DIRECT API CALL) ---------- */
  const handlePredict = async () => {
    setLoading(true);

    try {
      let fileToSend = image;

      if (mode === "digital") {
        const canvas = canvasRef.current;
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        fileToSend = new File([blob], "handwriting.png", {
          type: "image/png",
        });
      }

      if (!fileToSend) {
        alert("Please upload or write handwriting");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", fileToSend);

      const response = await fetch(
        "https://handwritten-digital-data-backend.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <h2>Handwriting Personality Prediction</h2>

      {/* MODE SELECTION */}
      <div>
        <label>
          <input
            type="radio"
            checked={mode === "upload"}
            onChange={() => setMode("upload")}
          />
          Upload Image
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            checked={mode === "digital"}
            onChange={() => setMode("digital")}
          />
          Write Digitally
        </label>
      </div>

      {/* IMAGE UPLOAD */}
      {mode === "upload" && (
        <>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="preview" className="preview" />}
        </>
      )}

      {/* DIGITAL CANVAS */}
      {mode === "digital" && (
        <>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            style={{ border: "1px solid black" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <br />
          <button onClick={clearCanvas}>Clear</button>
        </>
      )}

      <br />
      <button onClick={handlePredict}>Predict</button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div className="result">
          <h3>Personality Traits</h3>
          <p>Openness: {result.Openness.toFixed(2)}</p>
          <p>Conscientiousness: {result.Conscientiousness.toFixed(2)}</p>
          <p>Extraversion: {result.Extraversion.toFixed(2)}</p>
          <p>Agreeableness: {result.Agreeableness.toFixed(2)}</p>
          <p>Neuroticism: {result.Neuroticism.toFixed(2)}</p>
          <h3>Dominant Trait: {result.dominant_trait}</h3>
        </div>
      )}
    </div>
  );
}
