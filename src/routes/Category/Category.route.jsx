import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import { PathContext } from '../../contexts/path.context';

import ProductCard from '../../components/ProductCard/ProductCard.component';

import './Category.styles.scss';

function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const { previousPage } = useContext(PathContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      <div className="category-header-container">
        <div className="back-container">
          <Link to={previousPage}>
            <span className="back-arrows">&#10094;&#10094;</span>
            <span className="back">back</span>
          </Link>
        </div>
        <h2 className="category-title">{category.toUpperCase()}</h2>
      </div>
      <div className="category-products-container">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}

export default Category;
