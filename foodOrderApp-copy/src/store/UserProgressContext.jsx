import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',  // 'cart', 'checkout'
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
});

export function UserProgressContextProvider({ children }) { //we could do this with useReducer but since it's a simpler state we'll just apply useState.
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart, // showCart: showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx} >
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext; 