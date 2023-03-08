import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.styles.scss';

function CartIcon() {
  const { isVisible, setIsVisible, cartItems } = useContext(CartContext);

  function toggleCartDropdown() {
    return setIsVisible(!isVisible);
  }

  return (
    <div
      className="cart-icon-container"
      onClick={toggleCartDropdown}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="item-count">
        {cartItems.reduce((count, cartItem) => {
          return count + cartItem.quantity;
        }, 0)}
      </span>
    </div>
  );
}

export default CartIcon;
