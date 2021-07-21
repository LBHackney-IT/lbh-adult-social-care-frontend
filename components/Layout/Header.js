import React from 'react';
import { HackneyLogo } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { openMobileMenu, closeMobileMenu, selectMobileMenu } from '../../reducers/mobileMenuReducer';
import { useRouter } from 'next/router';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpened } = useSelector(selectMobileMenu);

  const onToggleMobileMenu = () => {
    if (isOpened) {
      dispatch(closeMobileMenu());
    } else {
      dispatch(openMobileMenu());
    }
  };

  return (
    <div className="header">
      <div className="level mb-0">
        <div className="level-item level-left">
          <div onClick={onToggleMobileMenu} className={`header__mobile-menu-button${isOpened ? ' opened' : ''}`}>
            {isOpened ? (
              <div className="header__mobile-menu-close">
                <p>+</p>
              </div>
            ) : (
              <>
                <div className="header__mobile-menu-line" />
                <div className="header__mobile-menu-line" />
                <div className="header__mobile-menu-line" />
              </>
            )}
          </div>
          <HackneyLogo className="is-clickable" onClick={() => router.push('/care-package')} />
        </div>
      </div>
      <div className="header-lines">
        <div className="header-line header-first-line" />
        <div className="header-line header-second-line" />
        <div className="header-line header-third-line" />
      </div>
    </div>
  );
};

export default Header;
