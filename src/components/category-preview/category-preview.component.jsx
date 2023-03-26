import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview-container">
      <div className="category-preview-header">
        <h2>
          <Link to={`${title}`}>
            <span className="title">{title.toUpperCase()}</span>
          </Link>
        </h2>
        <div className="see-more-container">
          <Link to={`${title}`}>
            <span className="see-more">see more</span>
            <span className="see-more-arrows">&#10095;&#10095;</span>
          </Link>
        </div>
      </div>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
