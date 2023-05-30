import { categoriesData } from '../../utils/categories-data/categories-data.utility';

import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

function Directory() {
  return (
    <div className="direcory-container">
      <div className="directory">
        {categoriesData.map(({ id, title, src, route }) => (
          <DirectoryItem
            key={id}
            title={title}
            src={src}
            route={route}
          />
        ))}
      </div>
    </div>
  );
}

export default Directory;
