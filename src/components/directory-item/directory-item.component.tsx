import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';

type DirectoryItemProps = {
  title: string;
  imageSrc: string;
  route: string;
};

function DirectoryItem({ title, imageSrc, route }: DirectoryItemProps) {
  const navigate = useNavigate();

  function navigateToCategory() {
    navigate(route);
  }

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <div
        className="body"
        onClick={navigateToCategory}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
