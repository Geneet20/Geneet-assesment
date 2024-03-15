// App.js
import React, { useRef, useState, useEffect } from 'react';
import CanvasEditor from './CanvasEditor';
import templateData from './template.json';
import "./App.css"

function App() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [editor, setEditor] = useState(null);
  // const [last, setLast] = useState("")
  const [first, setFirst] = useState("")



  useEffect(() => {
    if (canvasRef.current && !editor) {
      const editorInstance = new CanvasEditor(canvasRef.current, JSON.stringify(templateData));
      setEditor(editorInstance);
    }
  }, [editor]);

  const handleColorChange = (event) => {
    const color = event.target.value;
    editor.setBackgroundImage(color);
  };

  // const handleCaptionChange = (event) => {
  //   const caption = event.target.value;
  //   // editor.setCaption(caption);
  // };

  // const handleCtaTextChange = (event) => {
  //   const ctaText = event.target.value;
  //   editor.setCtaText(ctaText);
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    editor.setImage(file);
  };

  return (
    <>
       
        <canvas  ref={canvasRef} width="800" height="800" className="border">
        </canvas>
    <div className="flex justify-center items-center h-screen">
        <h1>{first}</h1>  

      <div className='box'>
     
        <div className="mt-4 ">
          <label className="block mb-2">Background Color</label>
          <input type="color" onChange={handleColorChange} />
        </div>
    
        
          <div className="mt-4">
            <label className="block mb-2">Header</label>
            <input
            id="lab"
            onChange={(e) => setFirst(e.target.value)}
            value={first}
            type="text"
           
            // ref={firstref}
          />

        </div>
        <div className="mt-4">
          <label className="block mb-2">Upload Image</label>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
