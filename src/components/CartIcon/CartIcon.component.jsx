import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.styles.scss';

function CartIcon() {
  const { isVisible, setIsVisible } = useContext(CartContext);

  function toggleCartDropdown() {
    return setIsVisible(!isVisible);
  }

  return (
    <div
      className="cart-icon-container"
      onClick={toggleCartDropdown}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="item-count">10</span>
    </div>
  );
}

export default CartIcon;
