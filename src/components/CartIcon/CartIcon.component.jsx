import { useContext, useEffect } from 'react';

import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.styles.scss';

function CartIcon() {
  const { isVisible, setIsVisible } = useContext(CartDropdownContext);

  function handleCartDropdownVisibility() {
    return isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  return (
    <div
      className="cart-icon-container"
      onClick={handleCartDropdownVisibility}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="item-count">10</span>
    </div>
  );
}

export default CartIcon;
