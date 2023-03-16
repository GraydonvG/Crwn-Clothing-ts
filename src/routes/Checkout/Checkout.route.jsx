import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem.component';

import './Checkout.styles.scss';

const headersArray = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

function Checkout() {
  const { cartItems, cartTotalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {headersArray.map((header) => {
          return (
            <div
              className="header-block"
              key={header}>
              <span>{header}</span>
            </div>
          );
        })}
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            cartItem={item}
          />
        ))}
      <span className="total-checkout-price">Total: ${cartTotalPrice}</span>
    </div>
  );
}

export default Checkout;
