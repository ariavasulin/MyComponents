import React from 'react';
import logo from '../assets/DWLogo_white+transparent.png'; // Import the logo

import { Button } from '../stories/Button';
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        <img
          src={logo} // Use the imported logo variable
          alt="Design Workshops Logo"
          className="storybook-logo"
        />
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            {/* <Button primary size="small" onClick={onCreateAccount} label="Sign up" /> */} {/* Removed Sign up button */}
          </>
        )}
      </div>
    </div>
  </header>
);
