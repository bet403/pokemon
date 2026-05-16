import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim().toLowerCase());
      setSearchTerm(''); // Arama yapıldığında input alanı temizlenmeli
    }
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Pokémon adı veya ID'si girin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        Ara
      </button>
    </form>
  );
};

export default SearchBar;
