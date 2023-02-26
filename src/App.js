import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        console.log("response data", response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Rick & Morty Characters</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Characters"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="character-grid">
        {filteredCharacters.map((character) => (
          <div className="character-card" key={character.id}>
            <img src={character.image} alt={character.name} />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <h3>Location</h3>
              <p>Name: {character.location.name}</p>
              {/* <p>Dimension: {character.location.name.split(" ")[1]}</p> */}
              <h3>Origin</h3>
              <p>Name: {character.origin.name}</p>
              {/* <p>Dimension: { ()=>{character.origin.name.split(" ").slice(1,Number(character.origin.name.length)).join(",")}}</p> */}
            </div>
            {/* <div className="character-location">
              <h3>Location</h3>
              <p>Name: {character.location.name}</p>
              <p>Dimension: {character.location.dimension}</p>
            </div>
            <div className="character-origin">
              <h3>Origin</h3>
              <p>Name: {character.origin.name}</p>
              <p>Dimension: {character.origin.dimension}</p>
            </div> */}
            <div className="character-episodes">
              <h3>Episodes</h3>
              <ul>
                {character.episode.map((episodeUrl) => {
                  const episodeId = episodeUrl.split("/").pop();
                  return <li key={episodeId}>Episode {episodeId}</li>;
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
