import { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignatureCanvas from "../components/SignatureCanvas";
import { mergeImages } from "../utils/mergeImage";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [merged, setMerged] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Please allow camera access to proceed.");
    }
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const image = canvas.toDataURL("image/png");
    setPhoto(image);
    
    // Stop camera stream
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  /**
   * INTENTIONAL BUG: Stale Closure
   * The dependencies array is empty, so `photo` and `signature` will always
   * be their initial values (null) within this callback.
   * This is a "logic bug" that prevents the merge from working correctly
   * unless the user re-renders the component in a way that accidentally
   * refreshes this closure (which doesn't happen here).
   */
  const handleMerge = useCallback(async () => {
    if (!photo || !signature) {
      alert("Please capture a photo and sign before merging.");
      return;
    }
    const img = await mergeImages(photo, signature);
    setMerged(img);
    // Persist to local storage for Analytics page
    localStorage.setItem(`merged_image_${id}`, img);
  }, []); // Missing [photo, signature, id] - INTENTIONAL BUG

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "40px auto", padding: "0 24px" }}>
      <header style={{ marginBottom: "32px" }}>
        <h1 className="list-title">Verify Identity</h1>
        <p className="list-subtitle">Employee ID: <span className="text-accent">#{id}</span></p>
      </header>

      <div className="glass-card" style={{ maxWidth: "100%", padding: "32px" }}>
        <div className="camera-section">
          <label className="input-group label" style={{ display: "block", marginBottom: "12px", color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Profile Photo
          </label>
          
          <div className="video-wrapper" style={{ position: "relative", background: "rgba(0,0,0,0.5)", borderRadius: "20px", overflow: "hidden", aspectRatio: "16/9", border: "1px solid var(--glass-border)" }}>
            {!photo ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {!cameraActive && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button className="btn-primary" style={{ width: "auto" }} onClick={startCamera}>
                      Start Camera
                    </button>
                  </div>
                )}
                {cameraActive && (
                  <button 
                    className="btn-primary" 
                    style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "auto", borderRadius: "50px", padding: "12px 32px", boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                    onClick={capture}
                  >
                    Capture Photo
                  </button>
                )}
              </>
            ) : (
              <img src={photo} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          
          {photo && (
            <button 
              className="text-muted" 
              style={{ background: "none", border: "none", cursor: "pointer", marginTop: "12px", fontSize: "0.875rem", textDecoration: "underline" }}
              onClick={() => { setPhoto(null); setMerged(null); }}
            >
              Retake Photo
            </button>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {photo && (
          <div className="animate-fade-in" style={{ marginTop: "32px" }}>
            <SignatureCanvas setSignature={setSignature} />
            
            <div style={{ marginTop: "40px", display: "flex", gap: "16px" }}>
              <button className="btn-primary" onClick={handleMerge}>
                Generate Identity Token
              </button>
              
              {merged && (
                <button 
                  className="btn-primary" 
                  style={{ background: "var(--accent)" }}
                  onClick={() => navigate("/analytics")}
                >
                  View Analytics
                </button>
              )}
            </div>
          </div>
        )}

        {merged && (
          <div className="animate-fade-in" style={{ marginTop: "32px", textAlign: "center" }}>
            <p className="subtitle" style={{ marginBottom: "16px" }}>Preview Result</p>
            <img 
              src={merged} 
              alt="Merged" 
              style={{ width: "100%", maxWidth: "400px", borderRadius: "16px", border: "4px solid white", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;