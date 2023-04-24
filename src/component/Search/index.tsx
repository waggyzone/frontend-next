import { useState } from "react";

const Search: React.FC<{ placeHolder?: string; onSearchClik?: Function; filterData?: [] }> = ({
  placeHolder,
  onSearchClik = () => {},
  filterData = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  return (
    <div className="flex relative">
      <button
        onClick={() => setShowModal((prev) => !prev)}
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button">
        {filterValue === "" ? "All " : filterValue}
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={` ${
          showModal ? "flex" : "hidden"
        }	z-10 absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul
          className="py-2 text-sm text-gray-700 w-full dark:text-gray-200"
          aria-labelledby="dropdown-button">
          {filterData.map((data: any, index: number) => (
            <li key={index}>
              <button
                onClick={(event) => {
                  setFilterValue(data.value);
                  setShowModal((prev) => !prev);
                }}
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {data?.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative w-full">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder={placeHolder}
          required
        />
        <button
          onClick={() => onSearchClik(filterValue, inputValue)}
          type="button"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
