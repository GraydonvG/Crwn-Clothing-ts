import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { updateUserDoc } from '../../utils/firebase/firebase.utility';

import { selectTotalCartPrice } from '../../store/cart/cart.selector';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import Modal from '../../components/modal/modal.component';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './address-and-payment-form.styles.scss';

function AddressAndPaymentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [userShippingDetails, setUserShippingDetails] = useState(null);
  const [isSavingShippingDetails, setIsSavingShippingDetails] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
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
      setModalText(`Error: ${error.message}`);
      setIsModalOpen(true);
    }
    // setMessage('Payment successful!');
    // setIsModalOpen(true);
  }

  function handleGetUserShippingDetails(event) {
    setModalText(null);
    if (event.complete) {
      setUserShippingDetails(event.value);
    }
  }

  async function handleSaveUserAddress() {
    setIsSavingShippingDetails(true);
    try {
      await updateUserDoc(userShippingDetails);
      setModalText('Shipping details saved');
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      setModalText('Error saving shipping details');
    }
    setIsSavingShippingDetails(false);
  }

  function handleIsModalOpen() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      <form
        className="address-and-payment-container"
        onSubmit={handleSubmitPayment}>
        <div className="address-container">
          <h2>Shipping Details</h2>
          <AddressElement
            onChange={handleGetUserShippingDetails}
            options={{
              mode: 'shipping',
            }}
          />
          <div className="use-saved-address">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Use saved shipping details"
            />
          </div>
          {isSavingShippingDetails ? (
            <Spinner />
          ) : (
            <Button
              type="button"
              onClick={handleSaveUserAddress}>
              Save
            </Button>
          )}
        </div>
        <div className="payment-container">
          <h2>Pay With Card</h2>
          <PaymentElement />
          {isProcessingPayment ? (
            <Spinner />
          ) : (
            <Button
              disabled={isProcessingPayment}
              type="submit">
              Pay now
            </Button>
          )}
        </div>
      </form>
      {isModalOpen && (
        <Modal
          onClose={handleIsModalOpen}
          isOpen={isModalOpen}>
          <h3 className="modal-text">{modalText}</h3>
        </Modal>
      )}
    </Fragment>
  );
}

export default AddressAndPaymentForm;
