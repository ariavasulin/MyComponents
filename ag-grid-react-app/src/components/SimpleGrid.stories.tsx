import React, { useState, useRef, useCallback } from 'react'; // Import React hooks
import type { Meta, StoryObj } from '@storybook/react';
import { ColDef, GridReadyEvent, GridApi, CellContextMenuEvent } from 'ag-grid-community'; // Revert imports: Add back CellContextMenuEvent, remove GetContextMenuItemsParams, MenuItemDef
import { Menu as MuiMenu, MenuItem } from '@mui/material'; // Import MUI Menu and MenuItem
import SimpleGrid, { IRow } from './SimpleGrid'; // Import IRow from SimpleGrid

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
  render: (args) => {
    const [localRowData, setLocalRowData] = useState<IRow[]>(args.rowData || []);
    // Removed useState for localPinnedBottomRowData
    const gridApiRef = useRef<GridApi<IRow> | null>(null); // Specify IRow type for GridApi
    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

    const onGridReady = useCallback((params: GridReadyEvent) => {
      gridApiRef.current = params.api;
    }, []);

    // Restore handleContextMenu
    const handleContextMenu = useCallback((event: CellContextMenuEvent) => {
      const nativeEvent = event.event; // Extract native event
      if (nativeEvent && nativeEvent instanceof MouseEvent) {
        nativeEvent.preventDefault();
        // nativeEvent.stopPropagation(); // Optional: Stop propagation if needed

        setContextMenu(
          contextMenu === null
            ? {
                mouseX: nativeEvent.clientX + 2, // Use clientX/Y from the MouseEvent
                mouseY: nativeEvent.clientY - 6, // Adjust slightly if needed
              }
            : // Repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other browsers present the menu positioning correctly even without the condition
              null,
        );
      }
    }, [contextMenu]); // Add contextMenu to dependency array

    const handleClose = () => {
      setContextMenu(null);
    };

    // Remove handleGetContextMenuItems

    // Removed onCellEditingStopped callback

    // Removed handleAddRow function

    return (
      <div>
        {/* Removed Add Row Below button */}
        <SimpleGrid
          rowData={localRowData}
          // pinnedBottomRowData prop removed
          colDefs={args.colDefs}
          defaultColDef={args.defaultColDef}
          onGridReady={onGridReady}
          // onCellEditingStopped prop removed
          // rowDragManaged is handled internally by SimpleGrid
          rowSelection={args.rowSelection} // Pass rowSelection from args
          // onCellContextMenu={handleContextMenu} // REMOVED: Prop doesn't exist on SimpleGrid
          // getContextMenuItems={handleGetContextMenuItems} // Remove new handler
        />
        <MuiMenu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={() => { console.log('Add Row Below clicked'); handleClose(); }}>Add Row Below</MenuItem>
          <MenuItem onClick={() => { console.log('Delete Selected clicked'); handleClose(); }}>Delete Selected</MenuItem>
          <MenuItem onClick={() => { console.log('Copy Selected clicked'); handleClose(); }}>Copy Selected</MenuItem>
        </MuiMenu>
      </div>
    );
  },
  // Args are passed to the render function, no need to repeat them here unless overriding render args
};

// ExampleWithMoreData story is removed as Default now handles the core logic.