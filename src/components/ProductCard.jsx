import React, { useState } from 'react'; // Import useState

// Basic styling (can be moved to a CSS file later)
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px', // Reduced margin slightly
    textAlign: 'center',
    width: '220px', // Adjusted width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '400px' // Adjusted height to accommodate controls
};

const imageStyle = {
    maxHeight: '150px',
    maxWidth: '100%',
    objectFit: 'contain',
    marginBottom: '10px'
};

const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
};

const inputStyle = {
    width: '50px',
    textAlign: 'center',
    margin: '0 5px'
};

const buttonContainerStyle = {
    marginTop: 'auto' // Pushes this container to the bottom
}

function ProductCard({ product }) {
    // State for quantity, initialized to 1
    const [quantity, setQuantity] = useState(1);

    // Destructure product properties
    const { id, title, price, description, image } = product;

    // Handle quantity change from input field
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        // Update quantity if it's a positive number, otherwise set to 1
        setQuantity(isNaN(value) || value < 1 ? 1 : value);
    };

    // Handle increment button click
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Handle decrement button click
    const handleDecrement = () => {
        // Prevent quantity from going below 1
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // Placeholder function for adding to cart
    const handleAddToCart = () => {
        console.log(`Adding ${quantity} of ${title} (ID: ${id}) to cart.`);
        // In Phase 4, this will call a function passed via props
        // to update the global cart state.
    };


    if (!product) {
        return <div>Product data is missing.</div>;
    }

    return (
        <div style={cardStyle}>
            <div> {/* Top section for image, title, price */}
                <img src={image} alt={title} style={imageStyle} />
                <h3>{title}</h3>
                <p>${price.toFixed(2)}</p>
            </div>

            <div style={buttonContainerStyle}> {/* Bottom section for controls and button */}
                 {/* Quantity Controls */}
                <div style={controlsStyle}>
                    <button onClick={handleDecrement}>-</button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        style={inputStyle}
                        min="1" // Set minimum value for browser validation
                    />
                    <button onClick={handleIncrement}>+</button>
                </div>

                {/* Add to Cart Button */}
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;