import { useContext } from "react";

import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";

export default function Meal({ meal }) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    } 

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt='An image' />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price" >
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description" >{meal.description}</p>
                </div>
                <p className="meal-item-actions" >
                    <Button className="button" onClick={handleAddMealToCart} >Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}

/**
 * The image src is different because with {meal.image}, we are only retrieving the name of the image i.e images/mac-and-cheese.jpg we then need 
 * to add the url to locate where it is on the server just like we would do when accessing the path of an image with src normally. It would then look like this:
 * <img src="http://localhost:3000/images/mac-and-cheese.jpg" />   (check answer on udemy for more clarifications) 
 * 
 * If we use just meal.image, then we will just access a part of the url or path
 * 
 */