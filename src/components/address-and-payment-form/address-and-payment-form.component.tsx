import { useState, Fragment, type FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectTotalCartPrice } from '../../store/cart/cart.selector';

import Button, { ButtonType } from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import Modal, { ModalIconTypes, type ModalTextType } from '../../components/modal/modal.component';

import './address-and-payment-form.styles.scss';

function AddressAndPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<ModalTextType | undefined>(undefined);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const cartTotalPrice = useSelector(selectTotalCartPrice);
  const [totalToPay, setTotalToPay] = useState(cartTotalPrice);
  const standardDeliveryFee = 6;
  const [deliveryFee, setDeliveryFee] = useState(standardDeliveryFee);

  async function submitPaymentHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements || totalToPay === 0) {
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
      body: JSON.stringify({ amount: totalToPay * 100, currency: 'usd' }),
    }).then((resp) => resp.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = response;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-status`,
      },
    });

    setIsProcessingPayment(false);

    if (error) {
      setModalText({ header: 'Error', message: `${error.message}` });
      setIsModalOpen(true);
    }
  }

  function isModalOpenHandler() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (cartTotalPrice > 50 || cartTotalPrice === 0) {
      setDeliveryFee(0);
      setTotalToPay(cartTotalPrice);
    } else if (cartTotalPrice < 50) {
      setDeliveryFee(standardDeliveryFee);
      setTotalToPay(cartTotalPrice + standardDeliveryFee);
    }
  }, [cartTotalPrice, deliveryFee]);

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
        <div className="checkout-total-container">
          <h2>Your Order</h2>
          <span className="total-cart-price">Cart Total: ${cartTotalPrice}</span>
          <span className="total-shipping">
            Delivery fee: {cartTotalPrice === 0 ? `$${deliveryFee}` : cartTotalPrice < 50 ? `$${deliveryFee}` : 'Free'}
          </span>
          <span className="total-checkout-price">Total To Pay: ${totalToPay}</span>
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
          onClose={isModalOpenHandler}
          modalHeader={modalText?.header}
          modalMessage={modalText?.message}
          modalIconType={ModalIconTypes.Alert}>
          <Button
            buttonType={ButtonType.Inverted}
            onClick={isModalOpenHandler}>
            Close
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default AddressAndPaymentForm;
