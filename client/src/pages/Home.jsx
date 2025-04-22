import { useEffect, useState } from 'react';
import { getItems } from '../services/api';
import AddItemForm from '../components/AddItemForm';
import WishlistItem from '../components/WishlistItem';

export default function Home() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🛒 Wishlist Tracker</h1>

      <AddItemForm onItemAdded={fetchItems} />

      <div className="max-w-md mx-auto">
        {items.map((item) => (
          <WishlistItem key={item._id} item={item} onUpdate={fetchItems} />
        ))}
      </div>
    </div>
  );
}
