import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { PageContext } from '../../contexts/page.context';

import './directory-item.styles.scss';

function DirectoryItem({ title, imageUrl, route }) {
  const { setPreviousPage } = useContext(PageContext);

  const navigate = useNavigate();

  function navigateToCategoryHandler() {
    navigate(route);
    setPreviousPage('/');
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
