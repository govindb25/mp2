import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './DetailView.module.css';

interface NasaImage {
  id: string;
  title: string;
  description: string;
  photographer: string;
  date_created: string;
  image_url: string;
}

interface DetailViewProps {
  images: NasaImage[];
}

const DetailView: React.FC<DetailViewProps> = ({ images }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentId = (location.state as { id: string })?.id;
  const currentIndex = images.findIndex(img => img.id === currentId);
  const currentImage = images[currentIndex];

  if (!currentImage) return <p>Image not found</p>;

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    navigate(`/detail/${images[prevIndex].id}`, { state: { id: images[prevIndex].id } });
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    navigate(`/detail/${images[nextIndex].id}`, { state: { id: images[nextIndex].id } });
  };

  return (
    <div className={styles.container}>
      <h2>{currentImage.title}</h2>
      <img src={currentImage.image_url} alt={currentImage.title} className={styles.image}/>
      <p>{currentImage.description}</p>
      <p><strong>Photographer:</strong> {currentImage.photographer}</p>
      <p><strong>Date:</strong> {currentImage.date_created}</p>
      <div className={styles.buttonGroup}>
        <button onClick={goPrev}>← Previous</button>
        <button onClick={goNext}>Next →</button>
      </div>
    </div>
  );
};

export default DetailView;
