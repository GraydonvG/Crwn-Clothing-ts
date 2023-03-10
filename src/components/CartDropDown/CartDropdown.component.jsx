import { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../CartItem/CartItem.component';
import Button from '../Button/Button.component';

import './CartDropdown.styles.scss';

function CartDropdown() {
  const { cartItems, cartPrice, toggleCartDropdown } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              cartItem={item}
            />
          ))}
      </div>
      {cartItems.length > 0 ? (
        <Fragment>
          <span className="total-cart-price">Total: ${cartPrice}</span>
          <Link to="/checkout">
            <Button
              type="button"
              onClick={toggleCartDropdown}>
              Got to checkout
            </Button>
          </Link>
        </Fragment>
      ) : (
        <span className="empty-message">Cart is currently empty</span>
      )}
    </div>
  );
}

export default CartDropdown;
