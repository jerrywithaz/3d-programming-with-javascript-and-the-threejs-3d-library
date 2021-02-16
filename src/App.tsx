import React, { useState } from "react";
import "./App.css";
import DepthMaterials from "./scenes/DepthMaterials";

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <div className="App">
      <button
        style={{ position: "absolute" }}
        onClick={() => setMounted(!mounted)}
      >
        {mounted ? "Unmount" : "Mount"}
      </button>
      {mounted && <DepthMaterials />}
    </div>
  );
}

export default App;
