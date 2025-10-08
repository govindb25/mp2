import React, { useEffect, useState } from 'react';
import { searchNASA } from '../components/nasaService';
import { Link } from 'react-router-dom';
import styles from './GalleryView.module.css';

interface NasaImage {
  id: string;
  title: string;
  description: string;
  photographer: string;
  date_created: string;
  image_url: string;
}

interface GalleryViewProps {
  setImages: React.Dispatch<React.SetStateAction<NasaImage[]>>;
}

const GalleryView: React.FC<GalleryViewProps> = ({ setImages }) => {
  const [query, setQuery] = useState('');
  const [imagesLocal, setImagesLocal] = useState<NasaImage[]>([]);
  const [filterPhotographer, setFilterPhotographer] = useState('');

  useEffect(() => {
    searchNASA(query).then((results) => {
      setImagesLocal(results);
      setImages(results);
    });
  }, [query, setImages]);

  const uniquePhotographers = Array.from(new Set(imagesLocal.map(img => img.photographer)));

  const filteredImages = imagesLocal.filter(img =>
    filterPhotographer === '' || img.photographer === filterPhotographer
  );

  return (
    <div className={styles.container}>
      <h2>NASA Gallery</h2>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select
        className={styles.select}
        value={filterPhotographer}
        onChange={e => setFilterPhotographer(e.target.value)}
      >
        <option value="">All Photographers</option>
        {uniquePhotographers.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <div className={styles.galleryContainer}>
        {filteredImages.map(img => (
          <div key={img.id} className={styles.galleryItem}>
            <Link to={`/detail/${img.id}`} state={{ id: img.id }}>
              <img src={img.image_url} alt={img.title} className={styles.image}/>
            </Link>
            <h4>{img.title}</h4>
            <p>{img.photographer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
