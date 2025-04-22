import { updateItem, deleteItem } from '../services/api';

export default function WishlistItem({ item, onUpdate }) {
  const handleToggle = async () => {
    await updateItem(item._id, { purchased: !item.purchased });
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteItem(item._id);
    onUpdate();
  };

  return (
    <div className={`bg-gray-50 p-4 rounded-lg shadow-sm mb-3 border-l-4 
      ${item.purchased ? 'border-green-400' : 'border-yellow-400'}`}>
      
      <h4 className={`text-lg font-semibold 
        ${item.purchased ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {item.name}
      </h4>

      <p className="text-sm text-gray-600">
        ₹{item.price || '-'} | Priority: {item.priority} | {item.category}
      </p>

      <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-500 text-sm underline">
        View Product
      </a>

      <div className="flex gap-2 mt-2">
        <button onClick={handleToggle}
          className={`text-sm px-3 py-1 rounded 
          ${item.purchased ? 'bg-yellow-300' : 'bg-green-500 text-white'}`}>
          {item.purchased ? 'Unmark' : 'Mark'} Purchased
        </button>
        <button onClick={handleDelete}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
