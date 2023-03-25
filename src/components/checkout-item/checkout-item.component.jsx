import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

function CheckoutItem({ cartItem }) {
  const { imageUrl, name, quantity, priceByQuantity } = cartItem;

  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  function addProductToCart() {
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
      <div className="quantity-container">
        <div
          className="quantity-arrow"
          onClick={removeProductFromCart}>
          &#10094;
        </div>
        <span className="quantity-value">{quantity}</span>
        <div
          className="quantity-arrow"
          onClick={addProductToCart}>
          &#10095;
        </div>
      </div>
      <span className="price">${priceByQuantity}</span>
      <div
        className="clear-product-from-checkout"
        onClick={clearProductFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
