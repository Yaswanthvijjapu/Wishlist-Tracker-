import { useState, useEffect } from "react";
import { getItems } from "../services/api";
import AddItemForm from "../components/AddItemForm";
import WishlistItem from "../components/WishlistItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // New state for sorting

  // Fetch items from API
  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filter items based on selected category, priority, and search query
  const filteredItems = items
    .filter((item) => {
      const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
      const matchesPriority = priorityFilter ? item.priority === priorityFilter : true;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 Wishlist Tracker
      </h1>

      <AddItemForm onItemAdded={fetchItems} />

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg shadow-sm w-3/4 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Filters Section */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <label htmlFor="category" className="text-sm font-semibold text-gray-700">
            Category:
          </label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="Tech">Tech</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-700">
            Priority:
          </label>
          <select
            id="priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Sorting Options */}
      <div className="flex justify-center mb-6">
        <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="max-w-3xl mx-auto">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-600">No items found with the selected filters or search.</p>
        ) : (
          filteredItems.map((item) => (
            <WishlistItem key={item._id} item={item} onUpdate={fetchItems} />
          ))
        )}
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setCategoryFilter("");
            setPriorityFilter("");
            setSearchQuery("");
            setSortBy("name");
          }}
          className="bg-gray-300 text-sm px-5 py-2 rounded-lg border hover:bg-gray-400 transition duration-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
