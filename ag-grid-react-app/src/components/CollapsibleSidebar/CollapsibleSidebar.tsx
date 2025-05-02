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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
// Imports for nesting
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder'; // Example icon for nested item

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
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface MenuItem {
    text: string;
    icon: React.ReactElement;
    children?: MenuItem[] | null;
}

// Sample Menu Data Structure with nesting
const menuItems: MenuItem[] = [
  { text: 'Inbox', icon: <InboxIcon />, children: null },
  { text: 'Starred', icon: <StarBorder />, children: null },
  {
    text: 'Mail Features',
    icon: <MailIcon />,
    children: [
      { text: 'Send email', icon: <MailIcon />, children: null },
      { text: 'Drafts', icon: <MailIcon />, children: null },
    ],
  },
  { text: 'Spam', icon: <InboxIcon />, children: null },
  {
      text: 'More Options',
      icon: <MenuIcon />,
      children: [
        { text: 'Trash', icon: <InboxIcon />, children: null },
        { text: 'All mail', icon: <InboxIcon />, children: null },
      ],
    },
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
  const [openNested, setOpenNested] = useState<{ [key: string]: boolean }>({}); // Nested items open/closed state

  const handleToggleDrawer = () => {
    setOpen(!open);
    // Optionally close all nested items when sidebar closes
    if (open) {
        setOpenNested({});
    }
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
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            {/* Show expand icons only if item has children and sidebar is open */}
            {open && item.children && (openNested[item.text] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {/* Render nested items if they exist */}
        {item.children && (
          <Collapse in={open && openNested[item.text]} timeout="auto" unmountOnExit>
            {/* Render children recursively, increasing level for indentation */}
            {/* Note: Current implementation only shows one level deep in Collapse */}
             <List component="div" disablePadding>
               {item.children.map(child => (
                 <ListItem key={child.text} disablePadding sx={{ display: 'block' }}>
                   <ListItemButton sx={{ pl: 4, minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                     <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
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
          <IconButton onClick={handleToggleDrawer}>
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