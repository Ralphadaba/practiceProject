import { useContext } from 'react';

import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    //const totalCartItems = cartCtx.items.length; // why didn't we just use this? // It won't be enough because we add every item only once and then after, we increase the item quantity and not the cart quantity. We want the cart quantity to increase as well.
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A React food logo" />
                <h1>REACTFOOD</h1>
            </div>
            <p>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </p>
        </header>
    );
}