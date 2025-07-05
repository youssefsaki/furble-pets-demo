import React, { useState } from "react";

function OrderForm() {
  const [items, setItems] = useState([
    { productId: "123", name: "Peluches", price: 10, quantity: 1 },
  ]);
  const [user, setUser] = useState({ id: "789", name: "Ahmed", email: "ahmed@example.com" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Calcul total automatique
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total, user }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        // Reset form if you want
      } else {
        setMessage(data.msg || "Erreur lors de la commande");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Passer commande</h2>
      <form onSubmit={handleSubmit}>
        {/* Affichage simple des items */}
        {items.map((item, idx) => (
          <div key={idx}>
            {item.name} - {item.price}€ x {item.quantity}
          </div>
        ))}

        <p>Total: {total}€</p>
        <button type="submit" disabled={loading}>
          {loading ? "En cours..." : "Confirmer la commande"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderForm;
