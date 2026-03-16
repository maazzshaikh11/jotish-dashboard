import { useRef, useEffect, useState } from "react";

function SignatureCanvas({ setSignature }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setSignature(canvas.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  return (
    <div className="signature-container" style={{ marginTop: "20px" }}>
      <label className="input-group label" style={{ display: "block", marginBottom: "10px", color: "var(--text-muted)", fontSize: "0.875rem" }}>
        Draw Signature
      </label>
      <div className="canvas-wrapper" style={{ position: "relative", background: "rgba(0,0,0,0.3)", borderRadius: "16px", overflow: "hidden", border: "1px dashed var(--glass-border)" }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={180}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ cursor: "crosshair", display: "block", width: "100%" }}
        />
        <button 
          onClick={clear}
          className="btn-primary"
          style={{ position: "absolute", bottom: "12px", right: "12px", width: "auto", padding: "6px 12px", fontSize: "0.75rem", background: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SignatureCanvas;