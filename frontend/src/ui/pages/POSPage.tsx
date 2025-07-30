// POSApp.tsx – Interface type caisse enregistreuse
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  category_id: number;
  description?: string;
}

interface Variant {
  id: number;
  product_id: number;
  barcode: string;
  price: number;
  stock: number;
  size?: string;
  color?: string;
}

interface CartItem {
  variant: Variant;
  quantity: number;
}

const POSPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [catSnap, prodSnap, varSnap] = await Promise.all([
        getDocs(collection(db, "categories")),
        getDocs(collection(db, "products")),
        getDocs(collection(db, "variants")),
      ]);
      setCategories(catSnap.docs.map((d) => d.data() as Category));
      setProducts(prodSnap.docs.map((d) => d.data() as Product));
      setVariants(varSnap.docs.map((d) => d.data() as Variant));
    };

    fetchData();
  }, []);

  const subcategories = categories.filter(
    (cat) => cat.parent_id === currentCategoryId
  );
  const filteredProducts = products.filter(
    (p) => p.category_id === currentCategoryId
  );

  const productVariants = selectedProduct
    ? variants.filter((v) => v.product_id === selectedProduct.id)
    : [];

  const addToCart = (variant: Variant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.variant.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { variant, quantity: 1 }];
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.variant.price,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-6 h-screen">
      {/* Catégories */}
      <div className="border p-4 rounded-xl shadow overflow-auto">
        <h2 className="text-lg font-bold mb-2">Catégories</h2>
        {currentCategoryId && (
          <button
            className="mb-2 text-blue-600 underline"
            onClick={() => {
              const parent =
                categories.find((c) => c.id === currentCategoryId)?.parent_id ??
                null;
              setCurrentCategoryId(parent);
              setSelectedProduct(null);
            }}
          >
            ← Retour
          </button>
        )}
        <ul>
          {subcategories.map((cat) => (
            <li key={cat.id}>
              <button
                className="text-left w-full hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setCurrentCategoryId(cat.id);
                  setSelectedProduct(null);
                }}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Produits */}
      <div className="border p-4 rounded-xl shadow overflow-auto">
        <h2 className="text-lg font-bold mb-2">Produits</h2>
        <ul>
          {filteredProducts.map((prod) => (
            <li key={prod.id}>
              <button
                className="text-left w-full hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedProduct(prod)}
              >
                {prod.name} – {prod.brand}
              </button>
            </li>
          ))}
        </ul>

        {selectedProduct && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">
              Variantes de {selectedProduct.name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {productVariants.map((v) => (
                <button
                  key={v.id}
                  className="border rounded p-2 hover:bg-green-100"
                  onClick={() => addToCart(v)}
                >
                  {v.size ?? ""} {v.color ?? ""} – {v.price.toFixed(2)} €
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Panier */}
      <div className="border p-4 rounded-xl shadow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2">Commande</h2>
          {cart.map((item) => (
            <div
              key={item.variant.id}
              className="flex justify-between items-center py-1"
            >
              <span>
                {item.variant.size ?? ""} {item.variant.color ?? ""}
              </span>
              <span>
                {item.quantity} × {item.variant.price.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-2 text-right font-bold">
          Total : {total.toFixed(2)} €
        </div>
      </div>
    </div>
  );
};

export default POSPage;
