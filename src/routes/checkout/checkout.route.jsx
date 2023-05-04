import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems, selectTotalCartPrice } from '../../store/cart/cart.selector';
import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const headersArray = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalCartPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClearAllCartItems() {
    dispatch(clearAllItemsFromCart());
  }

  function handleProceedToPayment() {
    navigate('/payment');
  }

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
      <div className="checkout-buttons-container">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={handleClearAllCartItems}>
          Clear cart
        </Button>
        <Button onClick={handleProceedToPayment}>Proceed to payment</Button>
      </div>
    </div>
  );
}

export default Checkout;
