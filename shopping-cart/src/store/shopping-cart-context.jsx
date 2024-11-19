import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

//You can pass any value to createContext whether a string, obbject, array...
export const CartContext = createContext({ //Setting these default values just help with auto-completion. Makes it faster to code as a developer
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

function shoppingCartReducer(state, action) { 
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find(
                (product) => product.id === action.payload
            );
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,  

                // ...state.items
            });
        }

        return {
            ...state, //not needed here because we have only one value in the state (acc to max)
            items: updatedItems,
        };

    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items]; //Never mutate the old state in memory directly instead copy it like this (why though?) 
        const updatedItemIndex = updatedItems.findIndex( // returns the index of the first element in an array that meets a specified condition.
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer( //we're using the sCdispatch to set the values (identifier and arguements) to update the state
        shoppingCartReducer,   //we're connecting the function to update the useReducer state
        {
            items: [],  // initial value for the state
        }
    );

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM', //with type, we will be able to identify the action
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        // setShoppingCart((prevShoppingCart) => { });
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,  //productId: productId,
                amount     //amount: amount    (JS syntax)
            }
        })
    }

    const ctxValue = {  //we want to pass the current and updated state value to useContext. 
        // items: shoppingCart.items, //before useReducer
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>
}




/**
 * const updatedItems = [...state.items];
 * When updating a reference value(object or array), we need create a new object or array to replace the prevState. To do this, you create a new copy of the old state 
 * first i.e. a new object or a new array along with the SPREAD operator to represent the 
 * previous state, then you change the copy or representative of the new object or array. If the reference values are
 * nested,i.e. nested objects and arrays, you spread the inner values out (use .map if required) because we have to COPY the actual values and not their pointers. 
 * It's just like giving the objects and arrays a newName with their properties spread to it and updating the newName. 
 * 
 * 
 * 
 * PREV handleAddItemToCart CODES BEFORE useReducer
 * 
 *  const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === id);
                updatedItems.push({
                    id: id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                items: updatedItems,
            };
        });
    }
    
    REDUCER

    function shoppingCartReducer(state, action) { //This reducer function will be called by react after you dispatch a so called action.
     The arguements passed (i.e. type and payload) in the dispatched function will then be received as a value for the second parameter, action

 */
