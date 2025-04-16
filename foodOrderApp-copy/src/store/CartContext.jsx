import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) { //reducer function //All these actions are in one place waiting to be triggered depending on the dispatch. 
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id  //the id of the item received from action
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem; //overide the existing item at that index with the updated item 

        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems }; //..state is not necessary here because items is the only property in the useReducer and we;re already returning it
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id  //the id of the item received from action
        );
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }); //reducer function, and the initial state value passed to useReducer as arguements

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });   // item: item  //The dispatch is the trigger for an action. It will trigger the necessary action
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem, // addItem: addItem
        removeItem, // removeItem: removeItem
        clearCart
    }

    return <CartContext value={cartContext}>
        {children}
    </CartContext>
}

export default CartContext;




/**
 * BEFORE useReducer() hook
 * 
 * const [availableMeals, setAvailableMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    //const [error, setError] = useState();
    const cartQuantity = selectedMeals.length;

    useEffect(() => {
        async function fetchAvailableMeals() {
            try {
                const meals = await fetchMeals();  //we await this because we want it to wait 1, and 2, it's a promise. If we don't await, it will return a promise object instead of the actual value i.e. Output: Promise { <pending> }
                setAvailableMeals(meals);
            } catch (error) {
                setError({
                    message: error.message || 'Could not fetch meals'
                })
            }
        }
        fetchAvailableMeals();
    }, [])

    function removeCartItem(id) {
        setSelectedMeals((prevMeals) => {
            const updatedMeals = [...prevMeals]
            const minusSelectedIndex = updatedMeals.findIndex((meal) => meal.id === id);
            const minusSelected = updatedMeals[minusSelectedIndex]
            if (minusSelected.quantity > 1) {
                const updatedQuantity = {
                    ...minusSelected,
                    quantity: minusSelected.quantity - 1
                }
                updatedMeals[minusSelectedIndex] = updatedQuantity;
            } else {
                return updatedMeals.filter((meals) => meals.id !== id);
            }
            return updatedMeals;
        });
    }

    function addToCart(id) {
        setSelectedMeals((prevMeals) => {
            const updatedMeals = [...prevMeals];

            const existingCartItemIndex = updatedMeals.findIndex(
                (selectedMeal) => selectedMeal.id === id
            );
            const existingCartItem = updatedMeals[existingCartItemIndex];

            if (existingCartItemIndex !== -1) {
                updatedMeals[existingCartItemIndex] = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1
                }
                // selectedMeals[existingCartItemIndex].quantity += 1; //error updating state mutably
            } else {
                const selected = availableMeals.find((meal) => meal.id === id);
                updatedMeals.push({
                    id: selected.id,
                    name: selected.name,
                    price: selected.price,
                    quantity: 1
                }
                )
            }
            return updatedMeals;

        })
    }
    console.log(selectedMeals);
 * 
 * 
 */