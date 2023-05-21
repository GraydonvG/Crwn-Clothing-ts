import { useDispatch, useSelector } from 'react-redux';

import { clearItemFromCart, type CartItem } from '../../store/cart/cart.slice';

import './cart-item.styles.scss';

type CartItemProps = {
  cartItem: CartItem;
};

function CartItem({ cartItem }: CartItemProps) {
  const { name, imageUrl, quantity, priceByQuantity } = cartItem;

  const dispatch = useDispatch();

  function clearProductFromCart() {
    dispatch(clearItemFromCart(cartItem));
  }

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">Qty: {quantity}</span>
        <span className="price">Total: ${priceByQuantity}</span>
      </div>
      <div
        className="clear-product-from-cart"
        onClick={clearProductFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CartItem;
