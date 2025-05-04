import { createContext, useState, useContext } from "react";

//create the context with initial empty values
const CartContext = createContext({
    cart:[],
    addToCart: ()=> {},
    totalCartItems:0,
    isCartModalOpen: false,
    openCartModal: ()=> {},
    closeCartModal: () => {},
});

//Provider component that will wrap our app
export function CartProvider({children}) {
    //Cart  state
    const [cart,setCart] = useState([]);
    //Cart modal state
    const [isCartModalOpen,setIsCartModalOpen] = useState(false);

    //Calculate total items in cart
    const totalCartItems = cart.reduce((total,item) => total + item.quantity,0);
    //Add to cart function
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.id === product.id
            );

            if(existingItemIndex >=0){
                //product exists - update quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + quantity
                };
                return updatedCart
            } else {
                //Product doesn't exist - add new item
                return [...prevCart,{...product,quantity}];
            }
        });
    };

    //Modal control functions 
    const openCartModal = () => setIsCartModalOpen(true);
    const closeCartModal = () => setIsCartModalOpen(false);

    //vallue object that will be provided to consumers
    const value = {
        cart,
        addToCart,
        totalCartItems,
        isCartModalOpen,
        openCartModal,
        closeCartModal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

   //Custom hook for consuming the context
   export function useCart(){
    const context = useContext(CartContext);
    if(context === undefined){ 
        throw new Error('useCart must be used within a Cart provider');
      }
      return context;
}