import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ColDef, GridReadyEvent, CellContextMenuEvent, GridApi, IRowNode } from 'ag-grid-community'; // Added IRowNode
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Define row data interface
export interface IRow { // Export the interface
    make: string;
    model: string;
    price: number | null; // Allow null for price
}

// Define props interface
interface SimpleGridProps {
    rowData?: IRow[];
    colDefs?: ColDef[];
    defaultColDef?: ColDef;
    onGridReady?: (params: GridReadyEvent<IRow>) => void; // Add prop for grid ready event, specify IRow type
    rowSelection: 'singleRow' | 'multiRow'; // CORRECTED: Use AG Grid values, make required
    // Note: onCellContextMenu is handled internally now
}

// Placeholder callback for row drag end event - KEEPING THIS FOR NOW
const onRowDragEnd = (e: any) => {
  console.log('Row drag ended:', e);
  // State update logic will go here later if needed
};

const SimpleGrid: React.FC<SimpleGridProps> = ({
    rowData = [], // Default to empty array if not provided
    colDefs = [], // Default to empty array if not provided
    defaultColDef = {}, // Default to empty object if not provided
    onGridReady: onGridReadyProp, // Rename incoming prop to avoid conflict
    rowSelection = 'multiRow', // CORRECTED: Provide default value
}) => {
    const gridApiRef = useRef<GridApi<IRow> | null>(null); // Ref to store gridApi
    const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null); // State for MUI Menu position
    const [contextMenuData, setContextMenuData] = useState<{ api: GridApi<IRow>, node: IRowNode<IRow>, rowIndex: number } | null>(null); // State for context menu data

    // Internal onGridReady to capture gridApi and call the prop (keeping for potential future use)
    const onGridReady = useCallback((params: GridReadyEvent<IRow>) => {
        console.log('SimpleGrid: onGridReady fired.'); // Log: Grid Ready
        gridApiRef.current = params.api;
        console.log('SimpleGrid: gridApiRef captured:', gridApiRef.current ? 'Yes' : 'No'); // Log: API captured?
        if (onGridReadyProp) {
            onGridReadyProp(params); // Call the passed-in onGridReady if it exists
        }
    }, [onGridReadyProp]);

    // MUI Context Menu Handler - Captures position and grid context
    const handleContextMenu = useCallback((event: CellContextMenuEvent<IRow>) => {
        const mouseEvent = event.event as MouseEvent;
        mouseEvent?.preventDefault();
        console.log('SimpleGrid: handleContextMenu triggered for row:', event.rowIndex, 'Node:', event.node); // Log context menu trigger with details
        setContextMenu(
            contextMenu === null
                ? { mouseX: mouseEvent!.clientX - 2, mouseY: mouseEvent!.clientY - 4 }
                : null,
        );
        // Store the context needed for actions
        if (event.api && event.node && event.rowIndex !== null && event.rowIndex !== undefined) {
             console.log('SimpleGrid: Storing context menu data.'); // Log storing data
             setContextMenuData({
                 api: event.api,
                 node: event.node,
                 rowIndex: event.rowIndex,
             });
        } else {
             console.warn('SimpleGrid: Context menu opened without full context.', event); // Warn if context is incomplete
             setContextMenuData(null); // Clear data if context is incomplete
        }
    }, [contextMenu]); // Re-evaluate when contextMenu position state changes

    // Function to close the MUI menu
    const handleClose = () => {
        setContextMenu(null); // Close the menu visually
        setContextMenuData(null); // Clear the context data
        console.log('SimpleGrid: Context menu closed and data cleared.'); // Log close
    };

    // --- Context Menu Action Handlers ---

    const handleAddRowBelow = useCallback(() => {
        if (!contextMenuData) {
            console.error("Cannot Add Row Below: Context menu data not available.");
            handleClose();
            return;
        }
        const { api, rowIndex } = contextMenuData;
        // Define a default new row conforming to the IRow interface
        const newRowDataObject: IRow = { make: "New Make", model: "New Model", price: 0 }; // Ensure it's a full IRow
        console.log(`SimpleGrid: Adding row below index ${rowIndex}`);
        api.applyTransaction({ add: [newRowDataObject], addIndex: rowIndex + 1 });
        handleClose(); // Close menu after action
    }, [contextMenuData]); // Depend on the captured context data

    const handleDeleteSelected = useCallback(() => {
        if (!contextMenuData) {
            console.error("Cannot delete row(s): Context menu data not available.");
            handleClose();
            return;
        }
        const { api, node } = contextMenuData; // Get node from context as well
        const selectedData = api.getSelectedRows();

        if (selectedData.length > 0) {
            console.log(`SimpleGrid: Deleting ${selectedData.length} selected row(s).`);
            api.applyTransaction({ remove: selectedData });
        } else if (node?.data) {
            // Fallback: If no selection, delete the row where the menu was opened
            console.log(`SimpleGrid: No selection, deleting context row:`, node.data);
            api.applyTransaction({ remove: [node.data] });
        } else {
            console.warn("SimpleGrid: Delete action triggered but no rows selected and no context row data found.");
        }
        handleClose(); // Close menu after action
    }, [contextMenuData]); // Depend on the captured context data

    const handleCopySelected = useCallback(async () => { // Make async for clipboard API
        if (!contextMenuData) {
            console.error("Cannot copy row(s): Context menu data not available.");
            handleClose();
            return;
        }
        const { api, node } = contextMenuData; // Get node from context
        const selectedData = api.getSelectedRows();
        let dataToCopy: IRow[] = [];

        if (selectedData.length > 0) {
            console.log(`SimpleGrid: Copying ${selectedData.length} selected row(s).`);
            dataToCopy = selectedData;
        } else if (node?.data) {
             // Fallback: If no selection, copy the row where the menu was opened
             console.log(`SimpleGrid: No selection, copying context row:`, node.data);
             dataToCopy = [node.data];
        }

        if (dataToCopy.length > 0) {
            const formattedString = JSON.stringify(dataToCopy, null, 2); // Pretty print JSON
            try {
                await navigator.clipboard.writeText(formattedString);
                console.log('SimpleGrid: Selected data copied to clipboard.');
            } catch (err) {
                console.error('SimpleGrid: Failed to copy text to clipboard:', err);
            }
        } else {
             console.warn("SimpleGrid: Copy action triggered but no rows selected and no context row data found.");
        }
        handleClose(); // Close menu after action
    }, [contextMenuData]); // Depend on the captured context data

    return (
        // wrapping container with theme & size
        <div
         className="ag-theme-quartz" // applying the grid theme
         style={{ height: 500, width: 600 }} // the grid will fill the size of the parent container
        >
            <AgGridReact<IRow>
                rowData={rowData} // Use prop
                columnDefs={colDefs} // Use prop
                defaultColDef={defaultColDef} // Use prop
                rowDragManaged={true} // Enable managed row dragging
                onRowDragEnd={onRowDragEnd} // Add the drag end handler
                onGridReady={onGridReady} // Use internal grid ready handler
                rowSelection={{ // CORRECTED: Use correct mode values
                    mode: rowSelection, // Use the passed-in 'singleRow' or 'multiRow'
                    checkboxes: true    // Enable checkboxes
                }}
                onCellContextMenu={handleContextMenu} // Use MUI context menu handler
                preventDefaultOnContextMenu={true} // Keep this to prevent default browser menu
                // getContextMenuItems prop removed
            />
            {/* MUI Context Menu */}
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleAddRowBelow}>Add Row Below</MenuItem>
                <MenuItem onClick={handleDeleteSelected}>Delete Selected</MenuItem>
                <MenuItem onClick={handleCopySelected}>Copy Selected</MenuItem>
            </Menu>
        </div>
    );
}

export default SimpleGrid;