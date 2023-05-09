import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { updateUserDoc } from '../../utils/firebase/firebase.utility';

import { selectTotalCartPrice } from '../../store/cart/cart.selector';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './address-and-payment-form.styles.scss';

function AddressAndPaymentForm() {
  const [isProcessingPayment, setIsProcessingPayment] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userShippingDetails, setUserShippingDetails] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectTotalCartPrice);

  async function handleSubmitPayment(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(`Error: ${submitError.message}`);
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      hearders: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100, currency: 'usd' }),
    }).then((resp) => resp.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = response;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.href}-successful`,
      },
    });

    setIsProcessingPayment(false);

    if (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  }

  function clearErrorMessage() {
    setErrorMessage(null);
  }

  function handleGetUserShippingDetails(event) {
    setErrorMessage(null);
    if (event.complete) {
      setUserShippingDetails(event.value);
    }
  }

  function handleSaveUserAddress() {
    updateUserDoc(userShippingDetails);
  }

  return (
    <form
      onClick={clearErrorMessage}
      className="address-and-payment-container"
      onSubmit={handleSubmitPayment}>
      <div className="address-container">
        <h2>Delivery Address</h2>
        <AddressElement
          onChange={handleGetUserShippingDetails}
          options={{
            mode: 'shipping',
          }}
        />
        <div className="use-saved-address">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Use saved address"
          />
        </div>
        <Button
          type="button"
          onClick={handleSaveUserAddress}>
          Save
        </Button>
      </div>
      <div className="payment-container">
        <h2>Pay With Card</h2>
        <PaymentElement onChange={clearErrorMessage} />
        {isProcessingPayment ? (
          <Spinner />
        ) : (
          <Button
            disabled={isProcessingPayment}
            type="submit">
            Pay now
          </Button>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </form>
  );
}

export default AddressAndPaymentForm;
