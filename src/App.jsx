import { useEffect, useCallback } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";
import { useStateValue } from "./hooks/useStateValue";

const ITEMS_PER_PAGE = 10;

function App() {
  const [state, dispatch] = useStateValue();
  const { data, loading, page, searchValue, sortBy } = state;

  const debounceValue = useDebounce(searchValue);

  const filteredData = data?.filter((item) =>
    item?.title?.toLowerCase().includes(debounceValue?.toLowerCase() ?? "")
  );

  const sortedData = [
    ...(filteredData ?? []).sort((a, b) => {
      if (sortBy === "ascTitle") return a?.title > b?.title ? 1 : -1;
      if (sortBy === "descTitle") return b?.title > a?.title ? 1 : -1;
      return 0;
    }),
  ];

  const listData = sortedData?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE);

  const fetchData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      dispatch({ type: "SET_DATA", payload: data });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  const onSearch = (e) => {
    const value = e?.target?.value ?? "";
    dispatch({ type: "SET_SEARCH_VALUE", payload: value });
    dispatch({ type: "SET_PAGE", payload: 1 });
  };

  const onSortBy = (e) => {
    const value = e?.target?.value ?? "";
    dispatch({ type: "SET_SORT_BY", payload: value });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search here..."
          onChange={onSearch}
          value={searchValue}
        />

        <select name="sort" id="sort" onChange={onSortBy}>
          <option value="">Sort by</option>
          <option value="ascTitle">ASC Title</option>
          <option value="descTitle">DESC Title</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {listData?.map((item, index) => (
            <tr key={item?.id}>
              <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item?.id}</td>
              <td>{item?.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
