import React, { useState } from 'react';

function ImageSearch({ setSelectedImage }) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = () => {
    const accessKey = 'WJXJwrMBdvp4FJJXgeJoh4LmaxGH27dEw6S-FaPH5J8'; 

    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}`)
      .then(response => response.json())
      .then(data => {
        setImages(data.results); 
      })
      .catch(error => console.error('Error fetching images:', error));
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Enter your search term" 
      />
      <button onClick={handleSearch}>Search</button>
      <div className="image-results">
        {images.map(image => (
          <img 
            key={image.id} 
            src={image.urls.thumb} 
            alt={image.alt_description} 
            onClick={() => setSelectedImage(image.urls.regular)} 
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;

