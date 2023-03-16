import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/ProductCard/ProductCard.component';

import './Shop.styles.scss';

function Shop() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {categoriesMap[title].map((category) => (
              <ProductCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default Shop;
