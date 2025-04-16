import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) { //we could just receive "item" prop here but he wants to show the multiple prop alternative
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} X {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}

/**
 * PREV (mine)
 * 
 * <li key={item.id} >
                        <p>{item.name} - {item.quantity} x ${item.price} </p>
                        <div>
                            <p>
                                <button onClick={() => onRemoveCart(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => addToCart(item.id)}>+</button>
                            </p>
                        </div>
                    </li>
 * 
 * 
 */