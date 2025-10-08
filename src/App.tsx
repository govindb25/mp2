import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView';
import DetailView from './components/DetailView';
import styles from './App.module.css'; 

function App() {
  const [images, setImages] = useState<any[]>([]);

  return (
    <Router>
      <div className={styles.App}>
        <h1>A Deep Dive into NASA by Govind</h1> 
        <nav>
          <Link to="/list">List View</Link>
          <Link to="/gallery">Gallery View</Link>
        </nav>

        <Routes>
          <Route path="/list" element={<ListView setImages={setImages} />} />
          <Route path="/gallery" element={<GalleryView setImages={setImages} />} />
          <Route path="/detail/:id" element={<DetailView images={images} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
