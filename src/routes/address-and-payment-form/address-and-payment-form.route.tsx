import { useState, Fragment, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectTotalCartPrice } from '../../store/cart/cart.selector';

import Button, { ButtonType } from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import Modal, { ModalIconTypes } from '../../components/modal/modal.component';

import './address-and-payment-form.styles.scss';

type ModalText = {
  header: string;
  message: string;
};

function AddressAndPaymentForm() {
  const amount = useSelector(selectTotalCartPrice);
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<ModalText | undefined>(undefined);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  async function submitPaymentHandler(event: FormEvent<HTMLFormElement>) {
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
      headers: {
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
      setModalText({ header: 'Error', message: `${error.message}` });
      setIsModalOpen(true);
    }
  }

  function handleIsModalOpen() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      <form
        className="address-and-payment-container"
        onSubmit={submitPaymentHandler}>
        <div className="address-container">
          <h2>Shipping Details</h2>
          <AddressElement
            options={{
              mode: 'shipping',
            }}
          />
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
          isOpen={isModalOpen}
          onClose={handleIsModalOpen}
          modalHeader={modalText?.header}
          modalMessage={modalText?.message}
          modalIconType={ModalIconTypes.Failed}>
          <Button
            buttonType={ButtonType.Inverted}
            onClick={handleIsModalOpen}>
            Close
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default AddressAndPaymentForm;
