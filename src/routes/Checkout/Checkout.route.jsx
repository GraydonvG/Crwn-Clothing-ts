import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../../components/CartItem/CartItem.component';

import './Checkout.styles.scss';

function Checkout() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            cartItem={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Checkout;
