import React from 'react';
import styles from './CartModal.module.css'; // Import CSS Module

function CartModal({ isOpen, onClose, cartItems }) {
    // If the modal is not open, render nothing
    if (!isOpen) {
        return null;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        // The Modal Overlay
        <div className={styles.modalOverlay} onClick={onClose}> {/* Use className */} 
            {/* The Modal Content Box */}
            {/* Stop propagation prevents closing modal when clicking inside content */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Use className */} 
                {/* Close Button */}
                <button className={styles.closeButton} onClick={onClose} aria-label="Close cart modal">&times;</button> {/* Use className */} 

                <h2 className={styles.title}>Your Cart</h2> {/* Use className */} 

                {/* Cart Items List */}
                {cartItems.length === 0 ? (
                    <p className={styles.emptyCartMessage}>Your cart is empty.</p> /* Use className */
                ) : (
                    <div>
                        {cartItems.map(item => {
                            // Get the first image URL, provide fallback
                            const imageUrl = item.images && item.images.length > 0 ? item.images[0] : '';
                            return (
                                <div key={item.id} className={styles.cartItem}> {/* Use className */} 
                                    {/* Use the derived imageUrl */}
                                    <img src={imageUrl} alt={item.title} className={styles.itemImage} /> {/* Use className */} 
                                    <div className={styles.itemDetails}> {/* Use className */} 
                                        <strong>{item.title}</strong>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                    {/* Add remove/update quantity buttons here later if needed */}
                                </div>
                            );
                        })}
                        {/* Total Price */}
                        <h3 className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h3> {/* Use className */} 
                    </div>
                )}

                {/* Placeholder Checkout Button */}
                <button className={styles.checkoutButton} disabled={cartItems.length === 0}>Proceed to Checkout</button> {/* Use className */} 
                <p className={styles.checkoutInfo}>(Checkout functionality not implemented)</p> {/* Use className */} 
            </div>
        </div>
    );
}

export default CartModal;