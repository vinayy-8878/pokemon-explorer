import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

function FavouritePokemons() {
  const [favouritesArray, setFavouritesArray] = useState([]);

  const navigate = useNavigate();

  // Load the favorites array from local storage on initial render
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavouritesArray(favorites);
  }, []);

  // Remove a Pokémon from favorites and update local storage
  const removeFromFavourites = (name) => {
    const updatedFavorites = favouritesArray.filter(
      (favorite) => favorite.name !== name
    );

    setFavouritesArray(updatedFavorites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
  };

  if (!favouritesArray.length) {
    return (
      <Message>
        <h1>You have not saved any Pokémons.</h1>
        <h3>Explore new and exciting Pokémons!</h3>

        <ExploreButton onClick={() => navigate("/pokemonslist")}>
          Explore Pokémons
        </ExploreButton>
      </Message>
    );
  }

  return (
    <>
      <Message>
        <h1>Your Favorite Pokémons</h1>

        <p style={{ color: "red" }}>
          Click on the heart icon again to remove a Pokémon from your favorites.
        </p>
      </Message>

      <Favorites>
       {favouritesArray.map((pokemon, index) => (
  <PokemonContainer key={pokemon.id || index}>
    <PokemonCard {...pokemon} />
    <FaHeart
      className="icon"
      onClick={() => {
        removeFromFavourites(pokemon.name);
      }}
    />
  </PokemonContainer>
))}

      </Favorites>
    </>
  );
}

const Message = styled.div`
  text-align: center;
  margin: 2rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3c3c3c;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #555;
  }
`;

const ExploreButton = styled.button`
  background-color: #ffc423;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ typeColor }) =>
    typeColor === "fire"
      ? "linear-gradient(145deg, #f08030, #f5a623)"
      : typeColor === "water"
      ? "linear-gradient(145deg, #6890f0, #78c6f0)"
      : typeColor === "grass"
      ? "linear-gradient(145deg, #78c850, #9bcc50)"
      : typeColor === "electric"
      ? "linear-gradient(145deg, #f8d030, #ffeb3b)"
      : typeColor === "psychic"
      ? "linear-gradient(145deg, #f85888, #ff80b1)"
      : typeColor === "fighting"
      ? "linear-gradient(145deg, #d1674c, #e10d28)"
      : typeColor === "rock"
      ? "linear-gradient(145deg, #b8a040, #cdb22f)"
      : typeColor === "ground"
      ? "linear-gradient(145deg, #e0c067, #ed9f2f)"
      : typeColor === "ice"
      ? "linear-gradient(145deg, #98d8d8, #72b8c8)"
      : typeColor === "bug"
      ? "linear-gradient(145deg, #a8b820, #9dcb0d)"
      : typeColor === "dragon"
      ? "linear-gradient(145deg, #7038f8, #d58ce6)"
      : typeColor === "fairy"
      ? "linear-gradient(145deg, #f4a0d8, #f4c1d7)"
      : typeColor === "poison"
      ? "linear-gradient(145deg, #a040a0, #9b56a7)"
      : typeColor === "ghost"
      ? "linear-gradient(145deg, #705898, #8f6cb6)"
      : typeColor === "steel"
      ? "linear-gradient(145deg, #b8b8d0, #b4b8b1)"
      : typeColor === "normal"
      ? "linear-gradient(145deg, #a8a878, #c8c894)"
      : typeColor === "dark"
      ? "linear-gradient(145deg, #705848, #3c2f2f)"
      : typeColor === "flying"
      ? "linear-gradient(145deg, #a890f0, #d0a7f0)"
      : "linear-gradient(145deg, #ffffff, #dbe4ff)"};
  }
`;

const Favorites = styled.div`
  display: grid;
  margin-block: 2rem;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 2rem;

  @media only screen and (max-width: 1170px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 915px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 615px) {
    grid-template-columns: 1fr;
  }
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    left: 65%;
    font-size: 3rem;
    cursor: pointer;
    color: #e63946; /* Heart color */
    transition: transform 0.2s;
  }

  .icon:hover {
    transform: scale(1.2);
  }
`;

export default FavouritePokemons;
