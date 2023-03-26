import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';

import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';

import './product-card.styles.scss';

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  function addToCard() {
    dispatch(addItemToCart(product, cartItems));
  }

  return (
    <div className="product-card-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="footer">
        <div className="name">{name}</div>
        <div className="price">${price}</div>
      </div>
      <Button
        type="button"
        buttonType="inverted"
        onClick={addToCard}>
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
