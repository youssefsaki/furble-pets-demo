import React, { useState } from 'react';

const DeliveryForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    alert(`Merci ${name}, votre commande sera livrée à ${address}. Nous vous contacterons au ${phone}.`);
    localStorage.removeItem('favorites');
    setName('');
    setPhone('');
    setAddress('');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Formulaire de livraison</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <textarea
          placeholder="Adresse complète"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows={3}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirmer la commande
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;
