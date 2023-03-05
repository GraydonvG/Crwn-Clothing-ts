import Button from '../Button/Button.component';

import './CartDropdown.styles.scss';

function CartDropdown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button type="button">Got to checkout</Button>
    </div>
  );
}

export default CartDropdown;
