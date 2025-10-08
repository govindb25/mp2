import React, { useEffect, useState } from 'react';
import { searchNASA } from '../components/nasaService';
import { Link } from 'react-router-dom';
import styles from './ListView.module.css';

interface NasaImage {
  id: string;
  title: string;
  description: string;
  photographer: string;
  date_created: string;
  image_url: string;
}

interface ListViewProps {
  setImages: React.Dispatch<React.SetStateAction<NasaImage[]>>;
}

const ListView: React.FC<ListViewProps> = ({ setImages }) => {
  const [query, setQuery] = useState('');
  const [imagesLocal, setImagesLocal] = useState<NasaImage[]>([]);
  const [sortTitleAsc, setSortTitleAsc] = useState(true);
  const [sortDateAsc, setSortDateAsc] = useState(true);

  useEffect(() => {
    searchNASA(query).then((results) => {
      setImagesLocal(results);
      setImages(results);
    });
  }, [query, setImages]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSortTitle = () => {
    setImagesLocal(prev =>
      [...prev].sort((a, b) =>
        sortTitleAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
    );
    setSortTitleAsc(!sortTitleAsc);
  };

  const handleSortDate = () => {
    setImagesLocal(prev =>
      [...prev].sort((a, b) => {
        const dateA = new Date(a.date_created).getTime();
        const dateB = new Date(b.date_created).getTime();
        return sortDateAsc ? dateA - dateB : dateB - dateA;
      })
    );
    setSortDateAsc(!sortDateAsc);
  };

  return (
    <div className={styles.container}>
      <h2>NASA Images List</h2>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={handleSearchChange}
      />
      <div className={styles.buttonGroup}>
        <button onClick={handleSortTitle}>
          Sort by Title (Alphabetically) {sortTitleAsc ? '↑' : '↓'} 
        </button>
        <button onClick={handleSortDate}>
          Sort by Date {sortDateAsc ? '↑' : '↓'}
        </button>
      </div>
      <ul className={styles.list}>
        {imagesLocal.map(img => (
          <li key={img.id} className={styles.listItem}>
            <h3>{img.title}</h3>
            <Link to={`/detail/${img.id}`} state={{ id: img.id }}>
              <img src={img.image_url} alt={img.title} className={styles.image}/>
            </Link>
            <p>{new Date(img.date_created).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
