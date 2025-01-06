import axios from "axios";
import React, { useEffect, useReducer } from "react";
import reducerFunction from "../Helpers/reducerfunction";
import PokemonCard from "./PokemonCard";
import Placeholder from "./placeholdergif.gif";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import ScrollToTopButton from "./ScrollToTopButton";

function AllPokemons({ setIsFilter }) {
  const initialState = {
    isLoading: false,
    offset: 0,
    results: [],
    count: 0,
  };
  const abortController = new AbortController();
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const getPokemonDataArray = async (res) => {
    res.map(async (item) => {
      const { data } = await axios.get(item.url);
      dispatch({
        type: "GET_POKEMONS",
        payload: data,
      });
    });
  };

  const pokemons = async (signal) => {
    try {
      dispatch({ type: "LOADING" });

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${state.offset}&limit=10`,
        {
          signal: signal,
        }
      );

      getPokemonDataArray(data.results);
      dispatch({ type: "TOTAL_COUNT", payload: data.count });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "END_LOADING" });
    }
  };

  const loadMorePokemons = () => {
    if (!state.isLoading) {
      pokemons(abortController.signal);
    }
  };

  useEffect(() => {
    pokemons(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <InfiniteScroll
      dataLength={state.results.length}
      next={loadMorePokemons}
      hasMore={state.results.length < state.count}
      loader={<Loader />}
      endMessage={
        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            margin: "2rem",
            color: "#3d3d3d",
          }}
        >
          <b>That's all for now! Thanks for exploring.</b>
        </p>
      }
    >
      <Filter>
        <h1>Do You want to Filter Pokemons?</h1>
        <FilterButton
          onClick={() => {
            setIsFilter(true);
          }}
        >
          Filter Pokemons
        </FilterButton>
        <SortButton
          onClick={() => {
            dispatch({ type: "SORT_BY_ID" });
          }}
        >
          Sort by ID
        </SortButton>
      </Filter>

      <PokemonList>
        {state.results.map((pokemon, index) => (
          <PokemonCard
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites?.other?.home?.front_default || Placeholder}
            types={pokemon.types.map((type) => type.type.name)}
          />
        ))}
        <ScrollToTopButton />
      </PokemonList>
    </InfiniteScroll>
  );
}

export default AllPokemons;

const Filter = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  flex-wrap: wrap;

  h1 {
    font-size: 2rem;
    color: #00006b;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
`;

const FilterButton = styled.button`
  padding: 0.85rem 2rem;
  background-color: blueviolet;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.3s;
  font-size: 1rem;
  margin:0.5rem;

  &:hover,
  &:active {
    transform: scale(0.95);
    background-color: darkviolet;
  }
`;

const SortButton = styled.button`
  padding: 0.85rem 2rem;
  background-color: deepskyblue;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.3s;
  font-size: 1rem;
  margin-left: auto;

  &:hover,
  &:active {
    transform: scale(0.95);
    background-color: dodgerblue;
  }
`;

const PokemonList = styled.div`
  display: grid;
  margin-block: 2rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-inline: 2rem;

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
