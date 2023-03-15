import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './CartItem.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const { calculateItemPrice, itemPrice, setItemPrice } = useContext(CartContext);

  // Update the items price displayed in the cart dropdown whenever the quantity changes
  useEffect(() => {
    setItemPrice(calculateItemPrice(price, quantity));
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
