import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
        
        // Initialize quantities
        const initialQuantities = {};
        data.forEach(product => {
          initialQuantities[product.id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const storedCart = JSON.parse(localStorage.getItem('favorites')) || [];
    setCart(storedCart);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max((prev[id] || 0) + delta, 0);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) return;

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    localStorage.setItem('favorites', JSON.stringify(updatedCart));
    setCart(updatedCart);
    
    // Show notification
    setNotification({
      id: product.id,
      name: product.name,
      quantity: quantity
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-3">
      {/* Hero Banner */}
      <div className="relative bg-cover bg-center h-90 rounded-xl shadow-lg mb-8 mx-4 sm:mx-6 lg:mx-8" 
           style={{ backgroundImage: 'url("/images/backgs.webp")' }}>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Premium Products for Your Pets
            </h2>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-50">
              Everything you need to keep your furry friends happy and healthy
            </p>
          </div>
        </div>
      </div>

      {/* Search and Cart Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => navigate('/favorites')}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md"
          >
            <FaShoppingCart className="mr-2" />
            View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
            <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image || "/images/default-product.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description || "High-quality product for your pet"}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-orange-600">
                      {product.price}
                    </span>
                    
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={quantities[product.id] <= 0}
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="px-3 py-1 w-8 text-center">
                        {quantities[product.id] || 0}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={quantities[product.id] <= 0}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      quantities[product.id] > 0 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">😕</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">
                We couldn't find any products matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          <div className="flex items-center">
            <FaShoppingCart className="mr-2" />
            <span>
              Added {notification.quantity} {notification.quantity > 1 ? 'items' : 'item'} of {notification.name} to cart
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProducts;