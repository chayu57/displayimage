import React, { useState } from 'react';
import ImageSearch from './components/Imagesearch.js';
import ImageEditor from './components/Imageeditor.js';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h1>Image Search and Edit</h1>
      {!selectedImage ? (
        <ImageSearch setSelectedImage={setSelectedImage} />
      ) : (
        <ImageEditor selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      )}
    </div>
  );
}

export default App;

