import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './CheckoutItem.styles.scss';

function CheckoutItem({ cartItem }) {
  const { imageUrl, name, quantity, priceByQuantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  function addToCart() {
    addItemToCart(cartItem);
  }

  function removeProductFromCart() {
    removeItemFromCart(cartItem);
  }

  function clearProductFromCart() {
    clearItemFromCart(cartItem);
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

      <span className="quantity-container">
        <div
          className="quantity-arrow"
          onClick={removeProductFromCart}>
          &#10094;
        </div>
        <span className="quantity-value">{quantity}</span>
        <div
          className="quantity-arrow"
          onClick={addToCart}>
          &#10095;
        </div>
      </span>
      <span className="price">${priceByQuantity}</span>
      <div
        className="clear-product-button"
        value="remove"
        onClick={clearProductFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
