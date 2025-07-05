import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormData = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    price: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(formData.price)) {
      alert('Price must be a number');
      return;
    }

    fetch('http://localhost:3001/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => navigate('/admin'))
      .catch((err) => console.error('Error adding pet:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-8">Add a New Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        {['name', 'species', 'price', 'image'].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-lg font-medium capitalize">
              {field === 'name' ? 'Pet Product' : field}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default FormData;
