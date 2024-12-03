import React, { useState, useMemo, useCallback } from "react";
import "./styles.css";

const products = [
  { id: 1, name: "Apple", price: 120, category: "Fruits" },
  { id: 2, name: "Banana", price: 60, category: "Fruits" },
  { id: 3, name: "Potato", price: 25, category: "Vegetables" },
  { id: 4, name: "Onion", price: 20, category: "Vegetables" },
  { id: 5, name: "Cabbage", price: 35, category: "Vegetables" },
  { id: 6, name: "Cauliflower", price: 50, category: "Vegetables" },
  { id: 7, name: "Spinach", price: 15, category: "Vegetables" },
  { id: 8, name: "Broccoli", price: 60, category: "Vegetables" },
  { id: 9, name: "Capsicum", price: 45, category: "Vegetables" },
  { id: 10, name: "Peas", price: 55, category: "Vegetables" },
  { id: 11, name: "Carrot", price: 40, category: "Vegetables" },
  { id: 12, name: "Tomato", price: 30, category: "Vegetables" },
  { id: 13, name: "Chicken", price: 200, category: "Meat" },
  { id: 14, name: "Mutton", price: 900, category: "Meat" },
  { id: 15, name: "Fish", price: 250, category: "Meat" }, 
  { id: 16, name: "Prawns", price: 600, category: "Meat" },
  { id: 17, name: "Crab", price: 700, category: "Meat" }
];

const ProductList = () => {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Memoized handler for filtering
  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  // Memoized handler for sorting
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    // Filter by category
    if (category !== "All") {
      filteredProducts = products.filter((product) => product.category === category);
    }

    // Sort products
    if (sortBy === "name") {
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      return filteredProducts.sort((a, b) => a.price - b.price);
    }

    return filteredProducts;
  }, [category, sortBy]);

  return (
    <div className="container">
      <h1 className="title">Product List</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <label>
          <strong>Filter by Category:</strong>
          <select value={category} onChange={handleCategoryChange} className="dropdown">
            <option value="All">All</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Meat">Meat</option>
          </select>
        </label>
      </div>

      {/* Sort Section */}
      <div className="sort-section">
        <strong>Sort by:</strong>
        <label className="radio-label">
          <input
            type="radio"
            value="name"
            checked={sortBy === "name"}
            onChange={handleSortChange}
          />
          Name
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="price"
            checked={sortBy === "price"}
            onChange={handleSortChange}
          />
          Price
        </label>
      </div>

      {/* Product List */}
      <ul className="product-list">
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-name">{product.name}</div>
            <div className="product-price">₹{product.price}</div>
            <div className="product-category">({product.category})</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
