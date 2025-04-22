import { useState, useEffect } from "react";
import { getItems } from "../services/api";
import AddItemForm from "../components/AddItemForm";
import WishlistItem from "../components/WishlistItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Fetch items from API
  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filter items based on selected category and priority
  const filteredItems = items.filter((item) => {
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesPriority = priorityFilter
      ? item.priority === priorityFilter
      : true;
    return matchesCategory && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 Wishlist Tracker
      </h1>

      <AddItemForm onItemAdded={fetchItems} />

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

      <div className="max-w-3xl mx-auto">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-600">No items found with the selected filters.</p>
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
          }}
          className="bg-gray-300 text-sm px-5 py-2 rounded-lg border hover:bg-gray-400 transition duration-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
