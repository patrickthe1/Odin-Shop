import React from 'react';
import styles from './CartModal.module.css'; // Import CSS Module
import { useCart } from './CartContext'; // Import our custom hook

function CartModal() {
    // Get what we need from context instead of props
    const { cart, isCartModalOpen, closeCartModal } = useCart();
    
    // If the modal is not open, render nothing
    if (!isCartModalOpen) {
        return null;
    }

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        // The Modal Overlay
        <div className={styles.modalOverlay} onClick={closeCartModal}> {/* Use closeCartModal from context */}
            {/* The Modal Content Box */}
            {/* Stop propagation prevents closing modal when clicking inside content */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeButton} onClick={closeCartModal} aria-label="Close cart modal">&times;</button>

                <h2 className={styles.title}>Your Cart</h2>

                {/* Cart Items List */}
                {cart.length === 0 ? (
                    <p className={styles.emptyCartMessage}>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map(item => {
                            // Get the first image URL, provide fallback
                            const imageUrl = item.images && item.images.length > 0 ? item.images[0] : '';
                            return (
                                <div key={item.id} className={styles.cartItem}>
                                    {/* Use the derived imageUrl */}
                                    <img src={imageUrl} alt={item.title} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <strong>{item.title}</strong>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                    {/* Add remove/update quantity buttons here later if needed */}
                                </div>
                            );
                        })}
                        {/* Total Price */}
                        <h3 className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                )}

                {/* Placeholder Checkout Button */}
                <button className={styles.checkoutButton} disabled={cart.length === 0}>Proceed to Checkout</button>
                <p className={styles.checkoutInfo}>(Checkout functionality not implemented)</p>
            </div>
        </div>
    );
}

export default CartModal;