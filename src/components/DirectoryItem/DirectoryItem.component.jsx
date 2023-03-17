import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { PathContext } from '../../contexts/path.context';

import './DirectoryItem.styles.scss';

function DirectoryItem({ title, imageUrl }) {
  const { setPreviousPage } = useContext(PathContext);

  const navigate = useNavigate();

  function setPreviousPageHandler() {
    setPreviousPage('/');
  }

  function navigateToCategoryHandler() {
    navigate(`shop/${title.toLowerCase()}`);
    setPreviousPageHandler();
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
