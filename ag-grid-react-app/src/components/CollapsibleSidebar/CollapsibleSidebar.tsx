import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Remove unused icons
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import StarBorder from '@mui/icons-material/StarBorder';
import MenuIcon from '@mui/icons-material/Menu'; // Keep for toggle button
// Imports for nesting
import Collapse from '@mui/material/Collapse'; // Import Collapse
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// Import new icons
import SettingsIcon from '@mui/icons-material/Settings';     // Gear icon for Asset Manager
import TaskAltIcon from '@mui/icons-material/TaskAlt';       // For Tasks
import BuildIcon from '@mui/icons-material/Build';           // Tool icon for Assets
import StorefrontIcon from '@mui/icons-material/Storefront'; // For Vendors

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Modify DrawerHeader to accept 'open' prop for conditional styling
const DrawerHeader = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  // Center icon when closed, put it at the end when open
  justifyContent: open ? 'flex-end' : 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    // Base styles for the paper inside the drawer
    '& .MuiDrawer-paper': {
      backgroundColor: '#3a3a3a', // Set background color
      color: 'white', // Set default text color
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: '#3a3a3a', // Ensure background persists when open
        color: 'white', // Ensure text color persists when open
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: '#3a3a3a', // Ensure background persists when closed
        color: 'white', // Ensure text color persists when closed
      },
    }),
  }),
);

interface MenuItem {
    text: string;
    icon: React.ReactElement;
    children?: MenuItem[] | null;
}

// Updated Menu Data Structure
const menuItems: MenuItem[] = [
  {
    text: 'Asset Manager',
    icon: <SettingsIcon />, // Changed icon
    children: [
      { text: 'Tasks', icon: <TaskAltIcon />, children: null },
      { text: 'Assets', icon: <BuildIcon />, children: null }, // Changed icon
      { text: 'Vendors', icon: <StorefrontIcon />, children: null },
    ],
  },
  // Add other top-level items here if needed in the future
];


interface CollapsibleSidebarProps {
  /**
   * Optional content to display below the sidebar
   */
  children?: React.ReactNode;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Sidebar open/closed state
  // Initialize with 'Asset Manager' open by default
  const [openNested, setOpenNested] = useState<{ [key: string]: boolean }>({'Asset Manager': true});

  const handleToggleDrawer = () => {
    setOpen(!open);
    // Removed logic that reset openNested state on sidebar close
  };

  const handleNestedClick = (itemText: string) => {
    // Can only open nested items if the main sidebar is open
    if (open) {
        setOpenNested(prev => ({ ...prev, [itemText]: !prev[itemText] }));
    }
  };

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.text}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => item.children && handleNestedClick(item.text)}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              pl: 2.5 + level * 2, // Indentation based on level
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white', // Set icon color
              }}
            >
              {/* Render icon directly, color inherited from ListItemIcon */}
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            {/* Show expand icons only if item has children and sidebar is open */}
            {open && item.children && (openNested[item.text] ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />)}
          </ListItemButton>
        </ListItem>
        {/* Render nested items with text when open */}
        {item.children && (
          <Collapse in={open && openNested[item.text]} timeout="auto" unmountOnExit>
            {/* Render children recursively, increasing level for indentation */}
            {/* Note: Current implementation only shows one level deep in Collapse */}
             <List component="div" disablePadding>
               {item.children.map(child => (
                 <ListItem key={child.text} disablePadding sx={{ display: 'block' }}>
                   <ListItemButton sx={{ pl: 4, minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                     <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'white' }}>
                       {/* Render icon directly, color inherited from ListItemIcon */}
                       {child.icon}
                     </ListItemIcon>
                     <ListItemText primary={child.text} sx={{ opacity: open ? 1 : 0 }} />
                   </ListItemButton>
                 </ListItem>
               ))}
             </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };


  return (
    // Wrap in a Box with minHeight to ensure the flex container takes full viewport height
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Removed the standalone IconButton */}
      <Drawer variant="permanent" open={open}>
        {/* Pass open prop to DrawerHeader for conditional styling */}
        <DrawerHeader open={open}>
          {/* Consolidate toggle logic into this single IconButton */}
          <IconButton onClick={handleToggleDrawer} sx={{ color: 'white' }}>
            {/* Show MenuIcon when closed, Chevron when open */}
            {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Render menu items using the new function */}
        <List>
            {renderMenuItems(menuItems)}
        </List>
        {/* Removed old static lists */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Optional: Add a header placeholder if needed */}
        {/* <DrawerHeader /> */}
        {children ? children : <p>Main Content Area</p>}
      </Box>
    </Box>
  );
};