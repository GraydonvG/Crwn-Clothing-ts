import { useEffect, useState } from 'react';

import './CartItem.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const [itemPrice, setItemPrice] = useState(0);

  // Update the items price displayed in the cart dropdown whenever the quantity changes
  useEffect(() => {
    const newItemPrice = price * quantity;
    setItemPrice(newItemPrice);
  }, [quantity]);

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">{`Quantity: ${quantity}`}</span>
        <span className="price">${itemPrice}</span>
      </div>
    </div>
  );
}

export default CartItem;
