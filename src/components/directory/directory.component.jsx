import { categoriesData } from '../../utils/categories-data/categories-data.utility';

import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

function Directory() {
  return (
    <div className="categories-container">
      {categoriesData.map(({ id, title, imageUrl, route }) => (
        <DirectoryItem
          key={id}
          title={title}
          imageUrl={imageUrl}
          route={route}
        />
      ))}
    </div>
  );
}

export default Directory;
