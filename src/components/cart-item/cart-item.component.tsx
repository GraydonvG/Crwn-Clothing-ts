import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { clearItemFromCart, type CartItemType } from '../../store/cart/cart.slice';

import './cart-item.styles.scss';

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const { name, imageUrl, quantity, priceByQuantity } = item;

  const dispatch = useDispatch();

  function clearProductFromCart() {
    dispatch(clearItemFromCart(item));
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
export default memo(CartItem);
