import React from 'react'
import SearchBar from './SearchBar'

export default function Main({ searchItem, handleSearchItem }) {

    const produits = [
        { id: 1, nom: "Produit 1" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        { id: 2, nom: "Produit 2" },
        // ...
      ];



  return (
    <div>
    {searchItem &&
        <SearchBar produits={produits} handleSearchItem={handleSearchItem} />}
    </div>
  )
}
