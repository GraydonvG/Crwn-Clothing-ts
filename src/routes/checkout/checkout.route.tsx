import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems, selectTotalCartPrice } from '../../store/cart/cart.selector';
import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import AddressAndPaymentForm from '../../components/address-and-payment-form/address-and-payment-form.component';
import Button, { ButtonType } from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Modal, { ModalIconTypes } from '../../components/modal/modal.component';

import './checkout.styles.scss';

const headersArray = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalCartPrice);
  const dispatch = useDispatch();
  const freeShippingMinimumSpend = 50;

  function clearAllCartItemsHandler() {
    dispatch(clearAllItemsFromCart());

    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }

  function isModalOpenHandler() {
    if (cartItems.length === 0) return;
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Fragment>
      <div className="get-free-shipping">
        {freeShippingMinimumSpend - cartTotalPrice > 0 ? (
          <span>
            Spend another ${freeShippingMinimumSpend - cartTotalPrice} to earn{' '}
            <span className="underline">free shipping!</span>
          </span>
        ) : (
          <span>You've earned free shipping!</span>
        )}
      </div>
      <div className="checkout-container">
        <div className="checkout-items-container">
          <h2 className="cart-items-header">Cart Items</h2>
          <div className="checkout-column-header">
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
          <Button
            buttonType={ButtonType.White}
            onClick={isModalOpenHandler}>
            Clear cart
          </Button>
        </div>
        <div className="checkout-payment-container">
          <AddressAndPaymentForm />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={isModalOpenHandler}
          modalHeader={'Clear cart'}
          modalMessage={'Are you sure?'}
          modalIconType={ModalIconTypes.Alert}>
          <Button
            onClick={clearAllCartItemsHandler}
            buttonType={ButtonType.Warning}>
            Clear
          </Button>
          <Button onClick={isModalOpenHandler}>Cancel</Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default Checkout;
