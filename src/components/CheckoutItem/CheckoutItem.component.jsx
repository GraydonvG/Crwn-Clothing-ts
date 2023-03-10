import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './CheckoutItem.styles.scss';

function CheckoutItem({ checkoutItem }) {
  const { imageUrl, name, price, quantity } = checkoutItem;
  const { setItemQuantity, removeItem } = useContext(CartContext);
  const [itemPrice, setItemPrice] = useState(0);

  function handleAdjustItemQuantity(event) {
    setItemQuantity(checkoutItem, event);
  }

  function handleRemoveItemFromCheckout(event) {
    removeItem(checkoutItem, event);
  }

  // Update the items price displayed at the checkout page whenever the quantity changes
  useEffect(() => {
    const newItemPrice = price * quantity;
    setItemPrice(newItemPrice);
  }, [quantity]);

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
          value="decrement"
          onClick={handleAdjustItemQuantity}>
          &lt;
        </button>
        <span className="item-quantity">{quantity}</span>
        <button
          className="item-quantity-button increment-quantity"
          value="increment"
          onClick={handleAdjustItemQuantity}>
          &gt;
        </button>
      </div>
      <span className="item-price">${itemPrice}</span>
      <button
        className="remove-item-button"
        value="remove"
        onClick={handleRemoveItemFromCheckout}>
        X
      </button>
    </div>
  );
}

export default CheckoutItem;
