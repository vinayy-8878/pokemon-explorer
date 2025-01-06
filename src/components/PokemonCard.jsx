import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Placeholder from "./placeholdergif.gif";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function PokemonCard({ id, name, image, types }) {
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const typeColor = types && types.length > 0 ? types[0] : "normal"; // Default to "normal"

  return (
    <Card typeColor={typeColor}>
      <Link
        to={`/singlepokemon/${name}`}
        className="link"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="image-container">
          {loading && (
            <img
              className="placeholder"
              src={Placeholder}
              alt="Loading placeholder"
            />
          )}
          <img
            src={image}
            onLoad={handleImageLoad}
            className={`pokemon-image ${loading ? "hidden" : ""}`}
            alt={`${name} image`}
          />
        </div>
        <p className="pokemon-id">ID: #{id}</p>
        <h1 className="pokemon-name">{name}</h1>
      
      </Link>
    </Card>
  );
}

export default PokemonCard;const Card = styled.div`
position: relative;
border-radius: 1rem;
overflow: hidden;
padding: 1rem;
text-align: center;
margin: auto;
width: 18rem;
height: 22rem;
background: #f5f5f5;
transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.3s ease-in-out;
box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

&:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  filter: brightness(1.1);
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

.link {
  text-decoration: none;
  color: black;
}

.image-container {
  position: relative;
  height: 15rem;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemon-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.pokemon-id,
.pokemon-name {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease, font-size 0.3s ease, font-weight 0.3s ease, color 0.3s ease;
  text-transform: capitalize;
}

.pokemon-id {
  font-size: 1.1rem;  /* Increased size */
  color: #6a6a6a;
  font-weight: 600;  /* Increased weight */
}

.pokemon-name {
  font-size: 1.3rem;  /* Increased size */
  font-weight: 800;  /* Increased weight */
  color: #333;
}

.favorite-icon-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
}

.favorite-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: #ff5c8d;
}

&:hover .pokemon-image {
  transform: scale(1.05);
}

&:hover .pokemon-id,
&:hover .pokemon-name {
  opacity: 1;
  transform: translateY(0);
  font-size: 1.4rem;  /* Slight increase in size */
  font-weight: 900;  /* Bold weight */
  color: #333;  /* Darker color for ID and Name */
}

&:hover .pokemon-id {
  opacity: 1;  /* Ensure ID is fully visible */
  color:#2F4F4F;  /* Change color of ID on hover */
  transform: scale(0.8);  /* Scale effect for the ID */
}

&:hover .pokemon-name {
  opacity: 1;  /* Ensure Name is fully visible */
  transform: scale(1.1);  /* Scale effect for the name */
}
`;
