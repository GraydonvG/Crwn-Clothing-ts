import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './CheckoutItem.styles.scss';

function CheckoutItem({ checkoutItem }) {
  const { imageUrl, name, price, quantity, priceByQuantity } = checkoutItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  function addToCart() {
    addItemToCart(checkoutItem);
  }

  function removeFromCart(event) {
    removeItemFromCart(checkoutItem, event);
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img
          src={imageUrl}
          alt={`${name}`}
        />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <span
          className="arrow"
          onClick={removeFromCart}>
          &lt;
        </span>
        {quantity}
        <span
          className="arrow"
          onClick={addToCart}>
          &gt;
        </span>
      </span>
      <span className="price">${priceByQuantity}</span>
      <div
        className="remove-button"
        value="remove"
        onClick={removeFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
