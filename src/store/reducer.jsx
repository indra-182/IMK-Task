export const initialState = {
  data: [],
  loading: false,
  page: 1,
  searchValue: "",
  sortBy: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH_VALUE":
      return { ...state, searchValue: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
