import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to="/">Search</NavLink>
        </li>
        <li>
          <NavLink to="/pokemonslist">All Pokémons</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

const StyledNav = styled.nav`
  background-color: #222;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;

    li {
      margin: 0;
     
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.3rem;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
     background: linear-gradient(135deg, #feb17b, #f3db4d, #ff6a95);
    z-index: -1;
    border-radius: 8px;
    transform: scale(0);
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    color:"black";
    animation: ${glowAnimation} 1.5s infinite;
  }

  &:hover:before {
    transform: scale(1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;
