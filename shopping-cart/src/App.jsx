import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/Shopping-cart-context.jsx';

function App() {

  return (
    <CartContextProvider> 
      <Header/>
      <Shop>
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;

/**
 * Any component(and its corresponding child component or descendant components e.g cart within header) 
 * wrapped by CartContext.Provider component has access to the shopping cart 
 * state and the functions to update it.
 */