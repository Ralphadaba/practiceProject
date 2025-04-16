import { useContext, useActionState } from "react";

import CartModal from "./CartModal";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

//Migrating to form action from Checkout.jsx file. 

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
} //created outside the component function to avoid infinite loops when passed as a dependency to useEffect

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function checkoutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries()); // with this we're creating an object with key-value pairs for the form values without having to do it one after the other//e.g. { email: test@example.com }

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }
    // fetch('https://localhost:3000/orders', {
    //     method: 'POST',
    //     headers: {      //why headers??
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stingify({  //what is the body for or what is it doing??
    //         order: {
    //             items: cartCtx.items,
    //             customer: customerData
    //         }
    //     })
    // });

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);  //isSending could also be pending 

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data</span>
    }

    if (data && !error) {
        return (
            <CartModal
                open={userProgressCtx.progress === 'checkout'}
                onClose={handleFinish}  // so the esc key is in sync with the close or okay button whatever it is as long as its closing the form or dialog.
            >
                <h2>Success</h2>
                <p>Your order was submitted successfully.</p>
                <p>
                    We will get back to you with more details via email within the next
                    few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </CartModal>
        );
    }

    return (
        <CartModal open={userProgressCtx.progress === 'checkout'}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </CartModal>
    );
}

/**
 * 
 * The type="button" ensures that the button does not submit the form, only closes it. //idg still
 * 
 * When using a regular button in a form, the browser will ceate an http request for you bu not to the backend
 * we want it to be sent to. Instead, the browser will send it to the development server serving the site, our front-end. But the server and the site
 * are not prepared and equipped to handle the request, therefore we need to preventDefault();   
 * 
 * 
 * PREV (mine)
 * 
 * <form action="">
                <h2>Checkout</h2> 
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <div>
                    <label htmlFor="firstName">Full Name</label>
                    <input type="text" id="firstName" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" />
                </div>
                <div>
                    <div>
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" id="postal-code" name="postal-code" />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" />
                    </div>
                </div>
                <div>
                    <button>Close</button> // onClose ??
                    <button>Submit Order</button>
                </div>
            </form>
 * 
 * 
 * 
 */