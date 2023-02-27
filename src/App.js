import React, {useState} from "react";
import MemoryGame from "./components/MemoryGame"; 

function App() {
  
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <MemoryGame />
    </div>
  );
}

export default App;
