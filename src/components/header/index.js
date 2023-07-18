import React, { useState } from "react";
import Draft from "./Draft";
import Ad from "./Ad";
import Main from "./Main";


export default function Header() {

  const [searchItem, setSearchItem] = useState(false)

  const handleSearchItem = () => {
    setSearchItem(!searchItem)
  }
  return (
    <header>
    <Ad />
    <Draft handleSearchItem={handleSearchItem} searchItem={searchItem} setSearchItem={setSearchItem} />
    <Main handleSearchItem={handleSearchItem} searchItem={searchItem} setSearchItem={setSearchItem} />
    </header>
  );
}
