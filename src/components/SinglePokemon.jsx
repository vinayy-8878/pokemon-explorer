import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Placeholder from "./placeholdergif.gif";
import Loader from "./Loader";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useSpring, animated } from "react-spring";
import BgImage from "./bgimage.png";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

function SinglePokemon() {
  const { name } = useParams();
  const [imageLoading, setImageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pokeData, setPokeData] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState("");

  // ! animation to message
  const messageSpring = useSpring({
    opacity: message ? 1 : 0,
    transform: message ? "translateY(0)" : "translateY(-20px)",
  });
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // ! bookmark feature functionality
  const handleFavoriteClick = () => {
    // Get the array data from the local storage
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
  
    // Toggle favorite state
    setIsBooked(!isBooked);
  
    // Add or remove the Pokémon from the favorites list
    if (!isBooked) {
      // Add Pokémon to favorites if not already in the list
      const isAlreadyInFavorites = favorites.some(
        (favorite) => favorite.name === pokeData.name
      );
  
      if (isAlreadyInFavorites) {
        setMessage("This Pokémon is already in your favorites!");
      } else {
        favorites.push({
          id: pokeData.id,
          name: pokeData.name,
          image: pokeData.image,
        });
  
        localStorage.setItem("favourites", JSON.stringify(favorites));
        setMessage("Pokémon added to your favorites!");
      }
    } else {
      // Remove Pokémon from favorites
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.name !== pokeData.name
      );
  
      localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
      setMessage("Pokémon removed from your favorites!");
    }
  };
  
  // ! get the pokemondata at initial render
  useEffect(() => {
    const singlePokemonData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokeData({
          id: data.id,
          name: data.name,
          abilities: data.abilities,
          weight: data.weight,
          height: data.height,
          species: data.species.name,
          stats: data.stats,
          image: data.sprites.other.home.front_default,
          types: data.types,
        });
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    singlePokemonData();
  }, []);

  // ! generate random color for background
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // ! ca;curate percentage for range to show in the frontend
  const calculatePercentage = (value, max) => {
    return Math.round((value / max) * 100);
  };
  return (
    <Wrapper>
      {imageLoading && <PlaceholderImage src={Placeholder} alt="Placeholder" />}
      <PokemonImage
        src={pokeData.image}
        onLoad={handleImageLoad}
        style={{ display: imageLoading ? "none" : "block" }}
        alt={pokeData.name}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="pokemon-info">
          <div>
          <PokemonTitle>
  <h2>{pokeData.name}</h2>
  {isBooked ? (
    <FaHeart className="icon" onClick={handleFavoriteClick} />
  ) : (
    <FaRegHeart className="icon" onClick={handleFavoriteClick} />
  )}
</PokemonTitle>

            <animated.div style={messageSpring}>
              <Message>{message}</Message>
            </animated.div>
          </div>

          <StatSection>
            <h3>Weight: {pokeData.weight} lbs</h3>
            <h3>Height: {pokeData.height} Inches</h3>
            <h3>Species: {pokeData.species}</h3>
          </StatSection>

          <StatsList>
            <h3>Stats:</h3>
            {pokeData.stats?.map((item, index) => (
              <li key={index}>
                {item.stat.name}: {item.base_stat}
                <StatRange>
                  <StatProgressBar
                    $percentage={calculatePercentage(item.base_stat, 150)}
                  />
                </StatRange>
              </li>
            ))}
          </StatsList>

          <AbilitiesList>
            <h3>Abilities:</h3>
            {pokeData.abilities?.map((ability, index) => (
              <AbilityButton
                key={index}
                style={{ backgroundColor: getRandomColor() }}
              >
                {ability.ability.name}
              </AbilityButton>
            ))}
          </AbilitiesList>

          <TypeList>
            <h3>Type:</h3>
            {pokeData.types?.map((type, index) => (
              <TypeTag
                key={index}
                style={{ backgroundColor: getRandomColor() }}
              >
                {type.type.name}
              </TypeTag>
            ))}
          </TypeList>
        </div>
      )}
    </Wrapper>
  );
}

export default SinglePokemon;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-transform: capitalize;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;

    h2 {
      font-size: 2.5rem;
    }
  }
  .pokemon-info {
    padding: 2rem;
    display: grid;
    gap: 1.5rem;
    background: linear-gradient(
        rgba(255, 255, 255, 0.858),
        rgba(255, 255, 255, 0.9)
      ),
      url(${BgImage});
    background-position: -20% 180%;
    background-size: 140%;
    background-repeat: no-repeat;
    background-color: #f8f8f8;
    background-blend-mode: color-burn;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
  }
`;

const PokemonTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

.icon {
  font-size: 2rem;
  cursor: pointer;
  color: #e63946; /* Heart color */
  transition: transform 0.2s;
}

.icon:hover {
  transform: scale(1.2);
}

`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2ab049;
`;

const PokemonImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StatSection = styled.div`
  display: grid;
  gap: 0.5rem;
`;
const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`;
const StatRange = styled.div`
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 5px;
`;

const StatProgressBar = styled.div`
  height: 100%;
  border-radius: 5px;
  background-color: #00da7c;
  width: ${({ $percentage }) => `${$percentage}%`};
`;

const AbilitiesList = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const AbilityButton = styled.button`
  background-color: #61dafb;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TypeList = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const TypeTag = styled.p`
  display: inline-block;
  margin: 0 0.25rem;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 4px;
  color: #ffffff;
`;
