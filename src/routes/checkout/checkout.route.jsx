import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems, selectTotalCartPrice } from '../../store/cart/cart.selector';
import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Modal, { MODAL_ICON_TYPES } from '../../components/modal/modal.component';

import './checkout.styles.scss';

const headersArray = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalCartPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClearAllCartItems() {
    dispatch(clearAllItemsFromCart());

    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }

  function handleProceedToPayment() {
    navigate('/payment');
  }

  function handleIsModalOpen() {
    if (cartItems.length === 0) return;
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Fragment>
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
            onClick={handleIsModalOpen}>
            Clear cart
          </Button>
          <Button onClick={handleProceedToPayment}>Proceed to payment</Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleIsModalOpen}
          modalHeader={'Clear cart'}
          modalMessage={'Are you sure?'}
          ModalIconType={MODAL_ICON_TYPES.alert}>
          <Button onClick={handleClearAllCartItems}>Clear</Button>
          <Button onClick={handleIsModalOpen}>Cancel</Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default Checkout;
