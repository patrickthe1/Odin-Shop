import React, {useState,useEffect} from 'react';

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
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );

}

export default ShopPage;