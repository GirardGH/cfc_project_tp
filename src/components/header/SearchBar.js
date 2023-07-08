import React, { useState } from "react";

export default function SearchBar({ produits }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const filteredProducts = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchEdit = (e) => {
    setSearchTerm(e.target.value);
    setIsPlaceholderVisible(e.target.value === "");
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    // Effectuer des actions de recherche ou autres ici
  };

  return (
    <div className="bg-[#770c14] bg-opacity-95 p-6 w-full min-h-fit max-h-full z-20 absolute">
      <form>
        <fieldset>
          <div className={`placeholder ${
                isPlaceholderVisible ? "" : "border-b-2 pb-6"
              } flex`}>
            {/* <label> */}
            <span
              className={`placeholder ${
                isPlaceholderVisible ? "" : "hidden"
              } text-white block absolute left-8`}
            >
              Rechercher un produit, un cadeau...
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchEdit}
              className="input-text bg-transparent bg-opacity-95 text-white focus:outline-none w-full"
              autoFocus
            />
            {/* </label> */}
            <button onClick={handleSearchClick} className="search-button text-white">
              Search
            </button>
          </div>
        </fieldset>
      </form>
      <div className=" lg:max-h-[25rem] overflow-y-auto">
        <ul className="mt-4 text-white">
          {searchTerm !== "" &&
            filteredProducts.map((produit) => (
              <li key={produit.id} className="mb-2">
                {produit.nom}
              </li>
            ))}
        </ul>

      </div>
      <div className={`placeholder ${
                isPlaceholderVisible ? "hidden" : ""
              } text-white border-t-2 pt-4 bg-transparent w-full flex justify-center items-center`}>
          <h3>voir toute notre sélection</h3>
        </div>
    </div>
  );
}

// import React, { useState } from "react";

// export default function SearchBar({ produits }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = produits.filter(
//     (produit) =>
//       produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60">
//       <div className="w-1/2 bg-black p-6">
//         <div
//           contentEditable
//           placeholder="Rechercher un produit"
//           className="editable-text w-full py-2 px-4 rounded-md bg-black text-white placeholder-white focus:outline-none"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <ul className="mt-4">
//           {searchTerm !== "" && filteredProducts.map((produit) => (
//             <li key={produit.id} className="mb-2">
//               {produit.nom}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
