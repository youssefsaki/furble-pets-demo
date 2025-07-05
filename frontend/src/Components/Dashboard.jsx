import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const API_URL = import.meta.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  const [pets, setPets] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("pets");

  // Form state for pet
  const [petForm, setPetForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    adoptionStatus: "",
    vaccinated: false,
    adoptableSince: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    image: "",
  });
  const [petImageFile, setPetImageFile] = useState(null);
  const [petUploading, setPetUploading] = useState(false);

  // Form state for product
  const [productForm, setProductForm] = useState({
    name: "",
    species: "",
    price: "",
    image: "",
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productUploading, setProductUploading] = useState(false);

  // Fetch pets and products on mount if admin
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        const petsRes = await axios.get(`${API_URL}/pets`);
        setPets(petsRes.data);

        const productsRes = await axios.get(`${API_URL}/products`);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // Upload image to Cloudinary helper
  const uploadImage = async (file, setUploading) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset_unsigned");

    setUploading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dalun8m2a/image/upload",
        formData
      );
      setUploading(false);
      return res.data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Upload error", error);
      return null;
    }
  };

  // Submit new pet
  const handlePetSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = petForm.image;
    if (petImageFile) {
      const url = await uploadImage(petImageFile, setPetUploading);
      if (!url) return alert("Erreur lors de l'upload de l'image de l'animal");
      imageUrl = url;
    }

    try {
      const newPet = {
        ...petForm,
        age: Number(petForm.age),
        vaccinated: Boolean(petForm.vaccinated),
        image: imageUrl,
      };

      const res = await axios.post(`${API_URL}/pets`, newPet);
      setPets([...pets, res.data]);

      // Reset form
      setPetForm({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        size: "",
        adoptionStatus: "",
        vaccinated: false,
        adoptableSince: "",
        location: { city: "", state: "", country: "" },
        image: "",
      });
      setPetImageFile(null);
    } catch (error) {
      console.error("Error adding pet", error);
    }
  };

  // Submit new product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = productForm.image;
    if (productImageFile) {
      const url = await uploadImage(productImageFile, setProductUploading);
      if (!url) return alert("Erreur lors de l'upload de l'image du produit");
      imageUrl = url;
    }

    try {
      const newProduct = {
        ...productForm,
        image: imageUrl,
      };

      const res = await axios.post(`${API_URL}/products`, newProduct);
      setProducts([...products, res.data]);

      // Reset form
      setProductForm({
        name: "",
        species: "",
        price: "",
        image: "",
      });
      setProductImageFile(null);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Admin</h1>
            <p className="text-gray-600">Gestion des animaux et produits</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "pets" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("pets")}
          >
            Animaux
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "products" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("products")}
          >
            Produits
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            {activeTab === "pets" ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un animal</h2>
                <form onSubmit={handlePetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={petForm.name}
                      onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Espèce</label>
                      <input
                        type="text"
                        value={petForm.species}
                        onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Race</label>
                      <input
                        type="text"
                        value={petForm.breed}
                        onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                      <input
                        type="number"
                        value={petForm.age}
                        onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                      <select
                        value={petForm.gender}
                        onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="male">Mâle</option>
                        <option value="female">Femelle</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Taille</label>
                    <input
                      type="text"
                      value={petForm.size}
                      onChange={(e) => setPetForm({ ...petForm, size: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut d'adoption</label>
                    <input
                      type="text"
                      value={petForm.adoptionStatus}
                      onChange={(e) => setPetForm({ ...petForm, adoptionStatus: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={petForm.vaccinated}
                      onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">Vacciné</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'adoption</label>
                    <input
                      type="date"
                      value={petForm.adoptableSince}
                      onChange={(e) => setPetForm({ ...petForm, adoptableSince: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                      <input
                        type="text"
                        value={petForm.location.city}
                        onChange={(e) => setPetForm({ ...petForm, location: { ...petForm.location, city: e.target.value } })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
                      <input
                        type="text"
                        value={petForm.location.state}
                        onChange={(e) => setPetForm({ ...petForm, location: { ...petForm.location, state: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                      <input
                        type="text"
                        value={petForm.location.country}
                        onChange={(e) => setPetForm({ ...petForm, location: { ...petForm.location, country: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                          </p>
                          <p className="text-xs text-gray-500">{petImageFile ? petImageFile.name : "Aucun fichier sélectionné"}</p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setPetImageFile(e.target.files[0])} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {petUploading && (
                      <div className="mt-2 text-sm text-blue-600 flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Upload en cours...
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                  >
                    Ajouter l'animal
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un produit</h2>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Espèce</label>
                    <input
                      type="text"
                      value={productForm.species}
                      onChange={(e) => setProductForm({ ...productForm, species: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                    <input
                      type="text"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                          </p>
                          <p className="text-xs text-gray-500">{productImageFile ? productImageFile.name : "Aucun fichier sélectionné"}</p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setProductImageFile(e.target.files[0])} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {productUploading && (
                      <div className="mt-2 text-sm text-blue-600 flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Upload en cours...
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
                  >
                    Ajouter le produit
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            {activeTab === "pets" ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Animaux ({pets.length})</h2>
                </div>
                {pets.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Aucun animal enregistré pour le moment.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {pets.map((pet) => (
                      <div key={pet._id} className="p-6 hover:bg-gray-50 transition duration-150">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={pet.image} 
                            alt={pet.name} 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">{pet.name}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                pet.adoptionStatus === "disponible" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {pet.adoptionStatus}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{pet.breed} - {pet.species}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {pet.gender === "male" ? "Mâle" : "Femelle"}
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                {pet.age} ans
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                {pet.size}
                              </span>
                              {pet.vaccinated && (
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Vacciné
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Localisation:</span> {pet.location.city}, {pet.location.state} {pet.location.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Produits ({products.length})</h2>
                </div>
                {products.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Aucun produit enregistré pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Espèce</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.species}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;