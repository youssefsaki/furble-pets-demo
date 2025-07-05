import React, { useState } from 'react';

const CheckoutForm = ({ onOrderPlaced }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('favorites');
    setSubmitted(true);
    if (onOrderPlaced) onOrderPlaced();
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-green-600">✅ Merci pour votre commande !</h2>
        <p>Nous vous contacterons bientôt pour la livraison.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Nom complet"
          className="w-full p-2 border rounded"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Adresse"
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Téléphone"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Note (optionnelle)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-700"
        >
          Confirmer la commande
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
