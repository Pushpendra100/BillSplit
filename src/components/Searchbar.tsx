"use client";

import React, { useState } from "react";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-5 py-1 w-[50vw] sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none "
        type="text"
        placeholder="Search (enter email)"
      />
    </div>
  );
};

