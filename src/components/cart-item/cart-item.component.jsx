import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './cart-item.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, quantity, priceByQuantity } = cartItem;
  const { clearItemFromCart } = useContext(CartContext);

  function clearProductFromCart() {
    clearItemFromCart(cartItem);
  }

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">Qty: {quantity}</span>
        <span className="price">Total: ${priceByQuantity}</span>
      </div>
      <div
        className="clear-product-from-cart"
        onClick={clearProductFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CartItem;
