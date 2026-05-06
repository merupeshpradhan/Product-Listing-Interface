import { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);

    const url = "https://api.freeapi.app/api/v1/public/randomproducts";
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data?.data?.data);
      setProducts(data?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            🛒 Product Catalog
          </h1>
          <p className="text-pink-500 text-sm font-medium uppercase tracking-widest">
            Rupesh Pradhan • Web Dev Cohort 2026
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-fuchsia-600 animate-bounce font-bold">
              Loading Products...
            </p>
          </div>
        ) : (
          /* Grid layout: 1 col on mobile, 2 on tablet, 3 on desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-2xl overflow-hidden shadow-lg border border-fuchsia-100 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-tr from-fuchsia-100 via-blue-100 to-purple-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    -{product.discountPercentage}%
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-fuchsia-700 truncate flex-1">
                      {product.title}
                    </h2>
                    <span className="text-lg font-bold text-blue-700 ml-2">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-xs font-bold uppercase text-purple-400 tracking-tighter">
                      Brand: {product.brand}
                    </span>
                    <div className="flex items-center text-yellow-400 text-sm">
                      ⭐ {product.rating}
                    </div>
                  </div>

                  <button className="w-full mt-5 bg-gradient-to-r from-fuchsia-600 via-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-blue-700 hover:to-fuchsia-700 hover:via-purple-700 transition-all duration-300 cursor-pointer">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
