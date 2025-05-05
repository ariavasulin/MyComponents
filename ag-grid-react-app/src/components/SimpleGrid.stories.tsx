import React, { useState, useRef, useCallback } from 'react'; // Import React hooks
import type { Meta, StoryObj } from '@storybook/react';
import { ColDef, GridReadyEvent, GridApi, CellContextMenuEvent } from 'ag-grid-community'; // Revert imports: Add back CellContextMenuEvent, remove GetContextMenuItemsParams, MenuItemDef
import { Menu as MuiMenu, MenuItem } from '@mui/material'; // Import MUI Menu and MenuItem
import SimpleGrid, { IRow } from './SimpleGrid'; // Import IRow from SimpleGrid
import './scrollbar-custom.css'; // Import custom scrollbar styles

// Removed local IRow definition, using the one imported from SimpleGrid.tsx
// Define default data and configurations matching the original component state
const defaultRowData: IRow[] = [
  { make: "Tesla", model: "Model Y", price: 64950 },
  { make: "Ford", model: "F-Series", price: 33850 },
  { make: "Toyota", model: "Corolla", price: 29600 },
];

const defaultColDefs: ColDef[] = [
  { field: "make", rowDrag: true, editable: true }, // Enable row dragging and editing
  { field: "model", editable: true },
  { field: "price", editable: true }
];

const defaultDefaultColDef: ColDef = {
  filter: true, // Enable filtering on all columns
  // Removed editable: true here as it's now per-column
};

// Removed blankPinnedRow constant definition
// Removed MENU_ID as it's not needed for MUI Menu implementation
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SimpleGrid> = {
  title: 'Components/SimpleGrid', // How the component is named in Storybook's sidebar
  component: SimpleGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Keep controls for initial setup, but state is managed internally in the story
    rowData: { control: 'object' },
    colDefs: { control: 'object' },
    defaultColDef: { control: 'object' },
    // pinnedBottomRowData prop removed from SimpleGrid
    // onGridReady is an internal callback, no control needed
    rowSelection: { control: 'select', options: ['singleRow', 'multiRow'] } // CORRECTED: Use AG Grid values
   },
   // Provide initial args for the wrapper component
   args: {
    rowData: defaultRowData,
    colDefs: [
      ...defaultColDefs // Spread the existing default column definitions
    ],
    defaultColDef: defaultDefaultColDef,
    rowSelection: 'multiRow', // CORRECTED: Use AG Grid value
    // pinnedBottomRowData prop removed from SimpleGrid
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story with logic for adding data from the pinned bottom row
export const Default: Story = {
  // Simplified render function, removing redundant state and context menu logic
  render: (args) => {
    // SimpleGrid now manages its own context menu and state based on props
    // Wrap SimpleGrid in a div with explicit dimensions for rendering
    return (
      <div style={{ height: '500px', width: '600px' }}>
        <SimpleGrid
          // Pass props directly from Storybook args
          rowData={args.rowData}
          colDefs={args.colDefs}
          defaultColDef={args.defaultColDef}
          rowSelection={args.rowSelection}
          // onGridReady can be passed if needed for external interaction, but not required for basic rendering
          // onGridReady={args.onGridReady}
        />
      </div>
    );
  },
  // Args are passed to the render function, no need to repeat them here unless overriding render args
};

// ExampleWithMoreData story is removed as Default now handles the core logic.