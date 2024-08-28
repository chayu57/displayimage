import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Image as FabricImage, Textbox, Rect } from 'fabric'; 

const ImageEditor = ({ selectedImage, setSelectedImage }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current);
    fabricCanvas.setWidth(800);
    fabricCanvas.setHeight(600);
    setCanvas(fabricCanvas);
  
    return () => {
      fabricCanvas.dispose();
    };
  }, []);
  
  useEffect(() => {
    if (canvas && selectedImage) {
      canvas.clear(); 
  
      FabricImage.fromURL(
        selectedImage,
        (img) => {
          img.set({
            left: 0,
            top: 0,
            scaleX: canvas.width / img.width,  
            scaleY: canvas.height / img.height,
          });
          canvas.add(img);
          canvas.sendToBack(img); 
          canvas.renderAll();
        },
        { crossOrigin: 'anonymous' }  
      );
    }
  }, [selectedImage, canvas]);
  

  const addText = () => {
    if (canvas) {
      const text = new Textbox('Edit Me', {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  const addShape = () => {
    if (canvas) {
      const rect = new Rect({
        left: 150,
        top: 150,
        fill: 'rgba(255, 0, 0, 0.5)',
        width: 100,
        height: 100,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  const handleDownload = () => {
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      link.download = 'edited-image.png';
      link.click();
    }
  };

  return (
    <div>
      <button onClick={() => setSelectedImage(null)}>Back to Search</button>
      <canvas ref={canvasRef} id="image-canvas"></canvas>
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={addShape}>Add Shape</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default ImageEditor;


