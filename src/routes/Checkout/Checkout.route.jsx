import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem.component';

import './Checkout.styles.scss';

function Checkout() {
  const { cartItems, cartPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            checkoutItem={item}
          />
        ))}
      <span className="total-checkout-price">Total: ${cartPrice}</span>
    </div>
  );
}

export default Checkout;
