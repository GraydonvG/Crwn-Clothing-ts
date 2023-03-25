import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/categories.selector';

import { NavigationContext } from '../../contexts/navigation.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

function Category() {
  const categoriesMap = useSelector(selectCategoriesMap);

  const { category } = useParams();

  const { previousPage } = useContext(NavigationContext);

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
          products.map((product) => {
            console.log(product);
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Category;
