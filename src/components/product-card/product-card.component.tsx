import { useDispatch } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.slice';
import { type CategoryItemType } from '../../store/categories/categories.slice';

import Button, { ButtonType } from '../button/button.component';

import './product-card.styles.scss';

type ProductCardProps = {
  item: CategoryItemType;
};

function ProductCard({ item }: ProductCardProps) {
  const { name, price, imageUrl } = item;
  const dispatch = useDispatch();

  function addToCard() {
    dispatch(addItemToCart(item));
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
        buttonType={ButtonType.Inverted}
        onClick={addToCard}>
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
