import React from 'react';

// Basic Modal Styling (can be moved to CSS)
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '80%',
    maxHeight: '80vh', // Limit height and allow scrolling
    overflowY: 'auto', // Add scroll if content overflows
    position: 'relative', // For positioning the close button
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
};

const cartItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
};

const itemImageStyle = {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    marginRight: '15px',
};

const itemDetailsStyle = {
    flexGrow: 1, // Take remaining space
};

function CartModal({ isOpen, onClose, cartItems }) {
    // If the modal is not open, render nothing
    if (!isOpen) {
        return null;
    }

    // Calculate total price (optional but nice)
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        // The Modal Overlay
        <div style={modalOverlayStyle} onClick={onClose}> {/* Close on overlay click */}
            {/* The Modal Content Box */}
            {/* Stop propagation prevents closing modal when clicking inside content */}
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button style={closeButtonStyle} onClick={onClose} aria-label="Close cart modal">&times;</button>

                <h2>Your Cart</h2>

                {/* Cart Items List */}
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} style={cartItemStyle}>
                                <img src={item.image} alt={item.title} style={itemImageStyle} />
                                <div style={itemDetailsStyle}>
                                    <strong>{item.title}</strong>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                                {/* Add remove/update quantity buttons here later if needed */}
                            </div>
                        ))}
                        {/* Total Price */}
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                )}

                {/* Placeholder Checkout Button */}
                <button disabled={cartItems.length === 0}>Proceed to Checkout</button>
                <p style={{fontSize: '0.8em', color: '#666'}}>(Checkout functionality not implemented)</p>
            </div>
        </div>
    );
}

export default CartModal;