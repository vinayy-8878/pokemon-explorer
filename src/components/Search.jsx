import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";

function Search() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=600`
        );

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            const id = data.id;
            const types = data.types.map((typeInfo) => typeInfo.type.name);

            return {
              id,
              name: data.name,
              image: data.sprites.other.home.front_default,
              types,
            };
          })
        );

        setPokemonList(detailedPokemon);
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = ({ target: { value } }) => {
    const trimmedValue = value.trim();
    setSearch(trimmedValue);

    if (trimmedValue) {
      if (!isNaN(trimmedValue)) {
        const filtered = pokemonList.filter(
          (pokemon) => pokemon.id === parseInt(trimmedValue, 10)
        );
        setFilteredPokemon(filtered);
        setIsError(filtered.length === 0);
      } else {
        const filtered = pokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(trimmedValue.toLowerCase())
        );
        setFilteredPokemon(filtered);
        setIsError(filtered.length === 0);
      }
    } else {
      setFilteredPokemon([]);
      setIsError(false);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">Welcome to Pokémon Explorer</h1>
        <h3>Find your favorite Pokémon by name or ID!</h3>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Pokémon Name or ID"
            onChange={handleSearch}
          />
        </div>

        {isLoading && <Loader />}
        {isError && search && (
          <NoResult>
            <h3>No Pokémon found!</h3>
            <p>Try searching for a different name or ID.</p>
          </NoResult>
        )}

        {!search && <h3>Enter a Pokémon name or ID to search!</h3>}

        <Box>
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </Box>
      </div>
    </Wrapper>
  );
}

export default Search;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Wrapper = styled.div`
  margin-block: 3rem;
  padding-inline: 1rem;
  .container {
    display: grid;
    place-content: center;
    text-align: center;
    gap: 2rem;
    color: #ffa938;
    font-family: "Trebuchet MS", Arial, sans-serif;

    .title {
      font-size: 3.5rem;
      background: linear-gradient(45deg, #ffa938, #ff5a5a, #ffd700, #40e0d0);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ${gradientAnimation} 5s infinite ease-in-out;
      text-transform: uppercase;
    }

    h3 {
      color: #ff5a5a;
      font-size: 1.3rem;
    }

    .search-box {
      display: grid;
      place-content: center;
      gap: 1rem;

      input[type="text"] {
        padding: 0.75rem;
        width: 17rem;
        border: 2px solid #ffa938;
        outline: none;
        box-shadow: 0 0 5px 1px rgba(255, 169, 56, 0.4);
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        font-size: 1rem;

        &:focus {
          border-color: #ff5a5a;
          box-shadow: 0 0 8px 2px rgba(255, 90, 90, 0.5);
        }

        &::placeholder {
          color: #aaa;
          font-style: italic;
        }
      }
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;

  ::-webkit-scrollbar {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffa938;
    border-radius: 4px;
  }
`;

const NoResult = styled.div`
  text-align: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;

  h3 {
    color: #ff5a5a;
    font-size: 1.5rem;
  }

  p {
    color: #555;
  }
`;
