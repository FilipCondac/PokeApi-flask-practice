import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState<any>({
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: "",
    moves: [],
    name: "",
    order: 0,
    past_types: [],
    species: [],
    sprites: [],
    stats: [],
    types: [],
    weight: 0,
  });
  const [id, setId] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const getPokemon = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/pokemon/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPokemon(data.data);
    } catch (error) {
      console.error("Fetching error: ", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Flask pokemon index</h1>
      <input
        type="text"
        placeholder="Enter Pokemon ID"
        value={id}
        onChange={handleInputChange}
        name="userInput"
      />
      <button onClick={() => getPokemon(id)}>Get Pokemon</button>
      <div>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      </div>
    </div>
  );
};
export default App;
