import { useSelector } from 'react-redux';

import { selectCartItems, selectTotalCartPrice } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const headersArray = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalCartPrice);

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
