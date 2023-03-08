import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../CartItem/CartItem.component';
import Button from '../Button/Button.component';

import './CartDropdown.styles.scss';

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
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
      <Button type="button">Got to checkout</Button>
    </div>
  );
}

export default CartDropdown;
