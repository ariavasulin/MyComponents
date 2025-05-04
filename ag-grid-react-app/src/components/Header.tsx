import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../assets/DWLogo_white+transparent.png'; // Import the logo

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void; // Keep prop definition even if button removed
}

export const Header = ({ user, onLogin, onLogout }: HeaderProps) => (
  <AppBar position="static" sx={{ backgroundColor: '#2e2e2e', boxShadow: 'none' }}>
    <Toolbar sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px', // Use specific px for exact match from header.css
      color: 'white', // Default text color for children
      minHeight: 'auto', // Override default minHeight based on padding
      // Ensure padding isn't overridden by default MUI media queries for Toolbar
      '@media (min-width: 0px)': { // Apply to all sizes starting from 0
         padding: '15px 20px',
      },
      '@media (min-width: 600px)': { // Explicitly override sm breakpoint default padding
         padding: '15px 20px',
         minHeight: 'auto', // Keep minHeight override
      }
      // fontFamily: 'Nunito Sans, Helvetica Neue, Helvetica, Arial, sans-serif', // Add if not globally themed
    }}>
      {/* Logo Section */}
      <Box
        component="img"
        src={logo}
        alt="Design Workshops Logo"
        sx={{
          height: '32px', // Match original CSS
          width: 'auto', // Match original CSS
          display: 'inline-block', // Match original CSS
          verticalAlign: 'top', // Match original CSS
        }}
      />

      {/* User/Buttons Section */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <Typography variant="body2" sx={{ // body2 is often around 14px
              mr: '10px', // Specific margin from header.css
              color: '#eee', // Specific welcome text color from header.css
              fontSize: '14px', // Explicit font size from header.css
             }}>
              Welcome, <Box component="span" sx={{ fontWeight: 'bold' }}>{user.name}</Box>!
            </Typography>
            <Button
              variant="outlined" // Match border style from header.css (.storybook-button)
              size="small"
              onClick={onLogout}
              sx={{
                color: 'white', // Explicit color from header.css
                borderColor: 'white', // Explicit border color from header.css
                '&:hover': { // Add a subtle hover effect
                   borderColor: 'rgba(255, 255, 255, 0.8)',
                   backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined" // Match border style from header.css (.storybook-button)
              size="small"
              onClick={onLogin}
              sx={{
                color: 'white', // Explicit color from header.css
                borderColor: 'white', // Explicit border color from header.css
                 '&:hover': { // Add a subtle hover effect
                   borderColor: 'rgba(255, 255, 255, 0.8)',
                   backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
                // No need for margin-left here as it's the only button
              }}
            >
              Log in
            </Button>
            {/* Removed Sign up button visually, but prop remains */}
          </>
        )}
      </Box>
    </Toolbar>
  </AppBar>
);
