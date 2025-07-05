import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [groupedFavorites, setGroupedFavorites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ 
    name: '', 
    phone: '', 
    address: '',
    city: '',
    notes: '' 
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const rawFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const grouped = rawFavorites.reduce((acc, product) => {
      const existing = acc.find(p => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);

    setGroupedFavorites(grouped);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const rawFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = rawFavorites.find(item => item.id === productId);
    if (!product) return;

    const withoutProduct = rawFavorites.filter(item => item.id !== productId);
    const updatedFavorites = [...withoutProduct, ...Array(newQuantity).fill(product)];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setGroupedFavorites(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (productId) => {
    const rawFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = rawFavorites.filter(item => item.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setGroupedFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const totalPrice = groupedFavorites.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      orderInfo.name.trim() !== '' &&
      orderInfo.phone.trim() !== '' &&
      orderInfo.address.trim() !== '' &&
      orderInfo.city.trim() !== ''
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = {
      ...orderInfo,
      items: groupedFavorites,
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'En attente'
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, order]));
    
    localStorage.removeItem('favorites');
    setGroupedFavorites([]);
    setOrderPlaced(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Votre Panier</h2>

      {groupedFavorites.length === 0 && !orderPlaced ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">Votre panier est vide.</p>
          <a href="/" className="mt-6 inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300">
            Continuer vos achats
          </a>
        </div>
      ) : orderPlaced ? (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-medium text-gray-900">Commande confirmée!</h3>
          <p className="mt-2 text-lg text-gray-600 max-w-md mx-auto">
            Merci pour votre commande. Nous vous contacterons bientôt pour confirmer la livraison.
          </p>
          <div className="mt-6">
            <a href="/" className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 inline-block">
              Retour à l'accueil
            </a>
          </div>
        </div>
      ) : (
        <div className="lg:flex lg:space-x-8">
          {/* Panier */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Vos articles</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {groupedFavorites.map(product => (
                  <li key={product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image || '/images/default-product.jpg'}
                          alt={product.name}
                          className="w-24 h-24 object-contain rounded-md"
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                          <p className="ml-4 text-lg font-medium text-orange-600">
                            {parseFloat(product.price).toFixed(2)} MAD
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                              disabled={product.quantity <= 1}
                              className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="mx-3 text-gray-700">{product.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="flex items-center text-sm text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Supprimer
                          </button>
                        </div>
                        <div className="mt-2 text-right text-sm font-medium text-gray-700">
                          Sous-total: {(product.quantity * parseFloat(product.price)).toFixed(2)} MAD
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Résumé et Formulaire */}
          <div className="mt-8 lg:mt-0 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              {!showForm ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">{totalPrice.toFixed(2)} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-medium">À définir</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-lg font-bold text-orange-600">{totalPrice.toFixed(2)} MAD</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-6 w-full bg-orange-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300"
                  >
                    Passer la commande
                  </button>
                </>
              ) : (
                <form onSubmit={handleOrderSubmit}>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Informations de livraison</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orderInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={orderInfo.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={orderInfo.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes (optionnel)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={orderInfo.notes}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total</span>
                      <span className="font-bold text-orange-600">{totalPrice.toFixed(2)} MAD</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`mt-6 w-full border border-transparent rounded-md py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ${
                      isFormValid() 
                        ? 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Confirmer la commande
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mt-3 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300"
                  >
                    Retour
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;