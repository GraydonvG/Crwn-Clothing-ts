import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

import { signOutUser } from '../../utils/firebase/firebase.utility';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/CartIcon/CartIcon.component';
import CartDropdown from '../../components/CartDropDown/CartDropDown.component';

import './NavigationBar.styles.scss';

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isVisible } = useContext(CartDropdownContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link
              className="nav-link"
              to="/auth"
              onClick={signOutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link
              className="nav-link"
              to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isVisible && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
