import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';

import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import Button, { ButtonType } from '../../components/button/button.component';
import Modal, { ModalIconTypes, type ModalTextType } from '../../components/modal/modal.component';

import './payment-status.styles.scss';

function PaymentStatus() {
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIconType, setModalIconType] = useState<ModalIconTypes>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<ModalTextType>();
  const [paymentStatus, setPaymentStatus] = useState<string>();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) return;

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;
      setPaymentStatus(paymentIntent.status);
      // Inspect the PaymentIntent `status` to indicate the status of the payment to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case 'succeeded':
          setModalText({
            header: 'Success!',
            message: ' Payment received. Thank you for your order!',
          });
          setModalIconType(ModalIconTypes.Success);
          setIsModalOpen(true);
          dispatch(clearAllItemsFromCart());
          break;
        case 'processing':
          setModalText({
            header: 'Payment processing.',
            message: " We'll update you when payment is received.",
          });
          setModalIconType(ModalIconTypes.Pending);
          setIsModalOpen(true);
          dispatch(clearAllItemsFromCart());
          break;
        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting payment again
          setModalText({
            header: 'Payment failed.',
            message: ' Please try another payment method.',
          });
          setModalIconType(ModalIconTypes.Failed);
          setIsModalOpen(true);
          break;
        default:
          setModalText({
            header: 'Error',
            message: 'Something went wrong.',
          });
          setModalIconType(ModalIconTypes.Alert);
          setIsModalOpen(true);
          break;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe]);

  function returnToHome() {
    navigate('/');
  }

  function returnToCheckout() {
    navigate('/checkout');
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      {isModalOpen ? (
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            modalHeader={modalText?.header}
            modalMessage={modalText?.message}
            modalIconType={modalIconType}>
            <Button
              buttonType={ButtonType.White}
              onClick={returnToHome}>
              Home
            </Button>
            {paymentStatus === 'succeeded' || paymentStatus === 'processing' ? (
              <Button onClick={closeModal}>Close</Button>
            ) : (
              <Button onClick={returnToCheckout}>Go to Checkout</Button>
            )}
          </Modal>
        </div>
      ) : (
        <div className="order-summary">
          {paymentStatus === 'succeeded' || paymentStatus === 'processing' ? <h2>Order Summary coming soon!</h2> : null}
        </div>
      )}
    </Fragment>
  );
}

export default PaymentStatus;
