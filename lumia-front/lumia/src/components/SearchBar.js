import React from 'react';

const SearchBar = ({ searchTerm, onChange, placeholder }) => {

  return (
    <div className="relative w-3/5 sm:px-0 px-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onChange}
        className="
          w-full
          pl-4 pr-10
          py-2
          rounded-md
          border border-[#5328EA]
          font-Gotham font-[500]
          text-[15px] text-[#5328EA]
          placeholder:text-[#5328EA] placeholder:font-Gotham placeholder:font-[500]
          focus:outline-none focus:border-[#5328EA] focus:ring-1 focus:ring-[#5328EA]
        "
      />
    </div>
  );
};

export default SearchBar;
