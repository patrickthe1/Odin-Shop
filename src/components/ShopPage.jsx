import React, {useState,useEffect} from 'react';
import ProductCard from './ProductCard';

const shopPageStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'center', // Center items horizontally
    gap: '16px' // Add space between cards
  };

function ShopPage() {
 const [products,setProducts] = useState([]);
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState(null);

 useEffect(()=>{
    const fetchProducts = async ()=>{
        try{
            const response = await fetch ('https://fakestoreapi.com/products');
            if(!response.ok) {
                throw new Error (`HTTP  error!: ${response.status}`)
            }
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setProducts([]);
        }  finally {
            setLoading (false); 
    } 
     };

     fetchProducts();
 } , []);

 if (loading) {
    return <div>Loading products....</div>;
 }

 if (error) {
    return <div>Error fetching products: {error}</div>;
 }
 return (
    <div>
      <h1>Shop Page</h1>
      {/* Apply grid styling to the container */}
      <div style={shopPageStyle}>
        {/* Map over products and render a ProductCard for each */}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

}

export default ShopPage;