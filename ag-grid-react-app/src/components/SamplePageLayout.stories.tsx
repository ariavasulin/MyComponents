import React, { useState } from 'react'; // Import useState
import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Box } from '@mui/material'; // Import Box

import { Header, HeaderProps } from './Header'; // Assuming HeaderProps is exported from Header.tsx
import { CollapsibleSidebar } from './CollapsibleSidebar/CollapsibleSidebar';
import SimpleGrid, { SimpleGridProps } from './SimpleGrid'; // Corrected import and added props import
import { ColDef } from 'ag-grid-community';
import { NotionPropertiesSidebar } from './NotionPropertiesSidebar/NotionPropertiesSidebar'; // Import NotionPropertiesSidebar

// Define the meta configuration for the story
const meta: Meta<typeof CollapsibleSidebar> = {
  title: 'Layouts/Sample Page',
  component: CollapsibleSidebar, // Using CollapsibleSidebar as the primary component for the layout story
  parameters: {
    layout: 'fullscreen', // Often useful for layout stories
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#2e2e2e' },
        { name: 'light', value: '#ffffff' }, // Keep light as an option
      ],
    },
  },
  // Define argTypes if needed for controls, though this story might be more demonstrative
  argTypes: {
    // Example: Control header props if needed, though hardcoding might be simpler for this demo
  },
};

export default meta;
type Story = StoryObj<typeof meta>; // Or StoryObj<typeof CollapsibleSidebar> if preferred

// Define the story for the logged-in state
export const LoggedIn: Story = {
  render: (args) => {
    // Mock Header props for the logged-in state
    const headerProps: HeaderProps = {
      user: { name: 'Jane Doe' },
      onLogin: () => console.log('Login clicked (should not happen in logged-in state)'),
      onLogout: () => console.log('Logout clicked'),
      onCreateAccount: () => console.log('Create Account clicked (should not happen in logged-in state)'),
    };

    return (
      <CollapsibleSidebar {...args}>
        {/* Render the Header inside the Sidebar's content area */}
        <Header {...headerProps} />
        {/* Render the main content below the Header */}
        <Typography sx={{ p: 3, color: 'white' }}> {/* Add padding and set text color */}
          This is the main content area inside the CollapsibleSidebar.
          The sidebar can be toggled using the menu icon (typically handled within the Header or Sidebar itself).
        </Typography>
      </CollapsibleSidebar>
    );
  },
  args: {
    // Default args for CollapsibleSidebar if any are needed
    // e.g., defaultOpen: true,
  },
};

// Define the story with SimpleGrid as content
export const WithSimpleGrid: Story = {
  render: (args: any) => { // Added type for args
    // Add state for user login status
    const [user, setUser] = useState<{ name: string } | undefined>({ name: 'Ariav' });

    // Define login/logout handlers
    const handleLogin = () => {
      setUser({ name: 'Ariav' });
      console.log('Login clicked');
    };
    const handleLogout = () => {
      setUser(undefined);
      console.log('Logout clicked');
    };

    // Update Header props to use state and handlers
    const headerProps: HeaderProps = {
      user: user,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };

    // Mock data for SimpleGrid
    const mockRowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
      { make: 'BMW', model: 'M5', price: 95000 },
    ];

    // Mock column definitions for SimpleGrid
    const mockColDefs: ColDef[] = [
      { field: 'make', filter: true, sortable: true, flex: 1 }, // Added flex: 1
      { field: 'model', filter: true, sortable: true, flex: 1 }, // Added flex: 1
      { field: 'price', filter: true, sortable: true, flex: 1 }, // Added flex: 1
    ];

    // Combine SimpleGrid props
    const gridProps: SimpleGridProps = {
        rowData: mockRowData,
        colDefs: mockColDefs, // Corrected prop name
        rowSelection: "multiRow", // Corrected value
    };

    return (
      // Corrected JSX tags
      <CollapsibleSidebar {...args}>
        {/* Render the Header */}
        <Header {...headerProps} />
        {/* Main content area with Notion sidebar and SimpleGrid */}
        {/* Main content area with vertical stacking */}
        <Box sx={{ p: 1 }}> {/* Add padding */}
          {/* Notion Properties Sidebar */}
          {/* Ensure the wrapper Box can accommodate the sidebar's min-width */}
          <Box sx={{ mb: 1, minWidth: 'fit-content' }}> {/* Reduced bottom margin by 50% */}
            <NotionPropertiesSidebar />
          </Box>
          {/* SimpleGrid below the sidebar */}
          {/* Give the grid container a defined height */}
          <Box sx={{ height: '500px', width: '100%' }}>
             <SimpleGrid {...gridProps} />
          </Box>
        </Box>
      </CollapsibleSidebar>
    );
  },
  args: {
    // Default args for CollapsibleSidebar if any are needed
    // e.g., defaultOpen: true,
  },
};

// Optional: Add a LoggedOut story if desired
// export const LoggedOut: Story = {
//   render: (args) => {
//     const headerProps: HeaderProps = {
//       user: undefined,
//       onLogin: () => console.log('Login clicked'),
//       onLogout: () => console.log('Logout clicked (should not happen in logged-out state)'),
//       onCreateAccount: () => console.log('Create Account clicked'),
//     };
//     return (
//       <>
//         <Header {...headerProps} />
//         <CollapsibleSidebar {...args}>
//           <Typography sx={{ p: 3 }}>
//             This is the main content area (Logged Out).
//           </Typography>
//         </CollapsibleSidebar>
//       </>
//     );
//   },
//   args: {},
// };