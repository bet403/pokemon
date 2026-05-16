import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (query) => {
    try {
      setLoading(true);
      setPokemonData(null); // Reset previous data/error
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      
      if (!response.ok) {
        throw new Error('Pokémon bulunamadı!');
      }
      
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      // We will store the error message in a special object structure 
      // or just handle it. To stick strictly to 4 states (searchTerm, pokemonData, loading, isShiny),
      // we can set pokemonData to a string or a specific error object when it fails.
      setPokemonData({ error: "Pokémon bulunamadı!" });
    } finally {
      setLoading(false);
    }
  };

  // Varsayılan olarak 'pikachu' verisini çekip ekranda göstermeli
  useEffect(() => {
    fetchPokemon('pikachu');
  }, []);

  // Arka planı dinamik olarak Pokémon'un tipine göre değiştir
  useEffect(() => {
    if (pokemonData && !pokemonData.error) {
      const primaryType = pokemonData.types[0]?.type.name || 'normal';
      document.documentElement.style.setProperty('--dynamic-bg', `var(--type-${primaryType})`);
    } else {
      document.documentElement.style.setProperty('--dynamic-bg', 'var(--poke-red)');
    }
  }, [pokemonData]);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Pokedex</h1>
        <p className="subtitle">Pokémon Ara</p>
      </header>

      <SearchBar onSearch={fetchPokemon} />

      <div className="content-area">
        {loading && <div className="loading">Yükleniyor...</div>}
        
        {!loading && pokemonData && pokemonData.error && (
          <div className="error-message">{pokemonData.error}</div>
        )}

        {!loading && pokemonData && !pokemonData.error && (
          <PokemonCard pokemon={pokemonData} />
        )}
      </div>
    </div>
  );
}

export default App;
