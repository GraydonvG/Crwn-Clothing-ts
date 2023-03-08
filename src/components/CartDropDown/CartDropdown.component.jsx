import { useContext, Fragment } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../CartItem/CartItem.component';
import Button from '../Button/Button.component';

import './CartDropdown.styles.scss';

function CartDropdown() {
  const { cartItems, cartPrice } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            cartItem={item}
          />
        ))}
      </div>
      {cartItems.length > 0 ? (
        <Fragment>
          <span className="total-cart-price">Total: ${cartPrice}</span>
          <Button type="button">Got to checkout</Button>
        </Fragment>
      ) : (
        <span className="empty-message">Cart is empty</span>
      )}
    </div>
  );
}

export default CartDropdown;
