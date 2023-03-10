import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem.component';

import './Checkout.styles.scss';

function Checkout() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            checkoutItem={item}
          />
        ))}
    </div>
  );
}

export default Checkout;
