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
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <span className="item-description">{name}</span>
      <div className="quantity-container">
        <button
          className="item-quantity-button decrement-quantity"
          onClick={removeFromCart}>
          &lt;
        </button>
        <span className="item-quantity">{quantity}</span>
        <button
          className="item-quantity-button increment-quantity"
          onClick={addToCart}>
          &gt;
        </button>
      </div>
      <span className="item-price">${priceByQuantity}</span>
      <button
        className="remove-item-button"
        value="remove"
        onClick={removeFromCart}>
        X
      </button>
    </div>
  );
}

export default CheckoutItem;
