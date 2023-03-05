import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.styles.scss';

function CartIcon() {
  return (
    <div className="cart-icon-container">
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="item-count">10</span>
    </div>
  );
}

export default CartIcon;
