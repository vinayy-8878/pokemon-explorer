const reducerFunction = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "END_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    case "GET_POKEMONS":
      return {
        ...state,
        results: [...state.results, action.payload],
      };

    case "TOTAL_COUNT":
      return {
        ...state,
        count: action.payload,
        offset: state.offset + 10,
      };

      case "SORT_BY_ID":
        const sortedResults = [...state.results].sort((a, b) => a.id - b.id);
        return { ...state, results: sortedResults };
  
  }
};

export default reducerFunction;
