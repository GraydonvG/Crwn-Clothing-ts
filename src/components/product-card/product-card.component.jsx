import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import './product-card.styles.scss';

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  function addToCard() {
    addItemToCart(product);
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
