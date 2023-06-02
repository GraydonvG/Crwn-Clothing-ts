import { lazy, Suspense } from 'react';

import { categoriesData } from '../../utils/categories-data/categories-data.utility';

const DirectoryItem = lazy(() => import('../directory-item/directory-item.component'));

import './directory.styles.scss';
import Spinner from '../spinner/spinner.component';

function Directory() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="direcory-container">
        <div className="directory">
          {categoriesData.map(({ id, title, imageSrc, route }) => (
            <DirectoryItem
              key={id}
              title={title}
              imageSrc={imageSrc}
              route={route}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}

export default Directory;
