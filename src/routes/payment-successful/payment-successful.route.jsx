import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import Button from '../../components/button/button.component';

import './payment-successful.styles.scss';

function PaymentSuccessful() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAllItemsFromCart());
  });

  function handleReturnToHome() {
    navigate('/');
  }

  return (
    <div className="payment-successful">
      <h2>Payment successful!</h2>
      <h3>Thank you for your order.</h3>
      <Button onClick={handleReturnToHome}>Home</Button>
    </div>
  );
}

export default PaymentSuccessful;
