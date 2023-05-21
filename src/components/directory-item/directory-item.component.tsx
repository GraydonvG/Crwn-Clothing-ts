import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';

type DirectoryItemProps = {
  title: string;
  imageUrl: string;
  route: string;
};

function DirectoryItem({ title, imageUrl, route }: DirectoryItemProps) {
  const navigate = useNavigate();

  function navigateToCategoryHandler() {
    navigate(route);
  }

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div
        className="body"
        onClick={navigateToCategoryHandler}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
