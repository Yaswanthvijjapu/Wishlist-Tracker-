import { useState } from 'react';
import { addItem } from '../services/api';

export default function AddItemForm({ onItemAdded }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    priority: 'Medium',
    link: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(form);
    onItemAdded(); // refresh list
    setForm({ name: '', price: '', priority: 'Medium', link: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3 max-w-md mx-auto mb-6">
      <h3 className="text-xl font-semibold text-center">Add Item</h3>

      <input name="name" placeholder="Item name" value={form.name} onChange={handleChange}
        className="w-full border p-2 rounded" required />

      <input name="price" placeholder="Price" value={form.price} onChange={handleChange}
        className="w-full border p-2 rounded" />

      <input name="link" placeholder="Product link" value={form.link} onChange={handleChange}
        className="w-full border p-2 rounded" />

      <input name="category" placeholder="Category" value={form.category} onChange={handleChange}
        className="w-full border p-2 rounded" />

      <select name="priority" value={form.priority} onChange={handleChange}
        className="w-full border p-2 rounded">
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add to Wishlist
      </button>
    </form>
  );
}
