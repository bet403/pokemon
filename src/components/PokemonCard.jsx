import { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);

  if (!pokemon) return null;

  // Capitalize first letter of name
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Format ID
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

  // Get Primary Type for glow
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const glowColor = `var(--type-${primaryType})`;

  // Toggle Shiny image
  const officialArtwork = pokemon.sprites.other['official-artwork'];
  const normalImage = officialArtwork.front_default || pokemon.sprites.front_default;
  const shinyImage = officialArtwork.front_shiny || pokemon.sprites.front_shiny;
  const displayImage = isShiny ? shinyImage : normalImage;

  // Extract Stats
  const getStat = (statName) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };
  
  const hp = getStat('hp');
  const attack = getStat('attack');
  const defense = getStat('defense');

  // Stat Bar Component
  const StatBar = ({ label, value, color }) => (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-bar-container">
        <div 
          className="stat-bar-fill" 
          style={{ 
            width: `${Math.min(100, (value / 150) * 100)}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="pokemon-card single-view">
      <div className="card-glow" style={{ backgroundColor: glowColor }}></div>
      <span className="pokemon-id">{formattedId}</span>

      <div className="image-container main-image-container">
        <img 
          src={displayImage} 
          alt={`${capitalizedName} ${isShiny ? 'Shiny' : 'Normal'}`} 
          className="pokemon-image"
        />
        <button 
          className={`shiny-toggle ${isShiny ? 'active' : ''}`}
          onClick={() => setIsShiny(!isShiny)}
        >
          ✨ Shiny {isShiny ? 'Açık' : 'Kapalı'}
        </button>
      </div>

      <div className="pokemon-info">
        <h2 className="pokemon-name large">{capitalizedName}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo) => (
            <span 
              key={typeInfo.type.name} 
              className="type-badge"
              style={{ backgroundColor: `var(--type-${typeInfo.type.name})` }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        <div className="pokemon-stats">
          <StatBar label="HP" value={hp} color="#10b981" />
          <StatBar label="ATK" value={attack} color="#ef4444" />
          <StatBar label="DEF" value={defense} color="#3b82f6" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
