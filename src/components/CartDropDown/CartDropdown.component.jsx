import { useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../CartItem/CartItem.component';
import Button from '../Button/Button.component';

import './CartDropdown.styles.scss';

function CartDropdown() {
  const { cartItems, cartTotalPrice, toggleCartDropdown } = useContext(CartContext);
  const navigate = useNavigate();

  function goToCheckoutHandler() {
    navigate('/checkout');
    toggleCartDropdown();
  }

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
          <span className="total-cart-price">Cart Total: ${cartTotalPrice}</span>
          <Button
            type="button"
            onClick={goToCheckoutHandler}>
            Got to checkout
          </Button>
        </Fragment>
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
  );
}

export default CartDropdown;
