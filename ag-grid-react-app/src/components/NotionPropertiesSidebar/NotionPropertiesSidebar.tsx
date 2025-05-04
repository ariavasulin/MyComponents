import React, { useState, useEffect } from 'react';
import styles from './NotionPropertiesSidebar.module.css'; // Import CSS module
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Paper,
  ListItemIcon,
  TextField, // Import TextField for editing
  ClickAwayListener, // To handle clicking outside the input
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Icon for the button

// Basic interface for a property
interface Property {
  id: string;
  label: string;
  value: string | React.ReactNode; // Keep allowing ReactNode, but editing will focus on string values for now
  icon?: React.ReactNode; // Optional icon
}

// Static data based on the screenshot (used as initial state if no props passed)
const initialPropertiesData: Property[] = [
  { id: 'priority', label: 'Priority', value: 'High', icon: '🎯' },
  { id: 'task_type', label: 'Task type', value: 'Polish', icon: '💅' },
  { id: 'effort', label: 'Effort', value: 'Medium', icon: '⏳' },
  {
    id: 'description',
    label: 'Description',
    value: 'Change header',
    icon: '📄',
  },
];

export interface NotionPropertiesSidebarProps {
  properties?: Property[]; // Allow passing properties
  onAddProperty?: () => void; // Callback for adding
  onPropertyChange?: (updatedProperties: Property[]) => void; // Callback when properties change
  editable?: boolean; // Control editing capability via prop
}

export const NotionPropertiesSidebar: React.FC<NotionPropertiesSidebarProps> = ({
  properties: propertiesProp, // Rename prop to avoid conflict with state
  onAddProperty,
  onPropertyChange,
  editable = true, // Default to editable
}) => {
  const [properties, setProperties] = useState<Property[]>(propertiesProp || initialPropertiesData);
  const [editingId, setEditingId] = useState<string | null>(null); // ID of the property being edited
  const [editValue, setEditValue] = useState<string>(''); // Current value in the input field

  // Update internal state if properties prop changes
  useEffect(() => {
    setProperties(propertiesProp || initialPropertiesData);
  }, [propertiesProp]);

  const handleEditClick = (prop: Property) => {
    if (!editable) return; // Don't allow editing if not enabled
    // For now, only allow editing string values
    if (typeof prop.value === 'string') {
        setEditingId(prop.id);
        setEditValue(prop.value);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const saveChanges = () => {
    if (editingId === null) return;

    const updatedProperties = properties.map((p) =>
      p.id === editingId ? { ...p, value: editValue } : p
    );
    setProperties(updatedProperties);
    setEditingId(null); // Exit edit mode
    setEditValue('');

    // Notify parent component of changes
    if (onPropertyChange) {
      onPropertyChange(updatedProperties);
    }
  };

  const handleInputBlur = () => {
    saveChanges();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveChanges();
    } else if (event.key === 'Escape') {
      setEditingId(null); // Cancel editing on Escape
      setEditValue('');
    }
  };


  return (
    <Paper
      elevation={0}
      className={styles.sidebarContainer}
      sx={{
        backgroundColor: '#2e2e2e', // Ensure background color is applied directly
        color: '#ffffff', // Set default text color for the container
        // width: 300, // Removed fixed width, rely on min-width from CSS module
        paddingX: 2, // Horizontal padding
        paddingTop: 2, // Top padding
        height: '100%',
        // borderRight: '1px solid rgba(255, 255, 255, 0.12)', // Removed borderRight
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Removed gutterBottom, margin handled by CSS */}
      <Typography variant="subtitle1" className={styles.title} sx={{ color: '#ffffff' }}>
        Properties
      </Typography>
      {/* Added paddingBottom, removed paddingTop */}
      <List dense className={styles.propertyList} sx={{ flexGrow: 1, overflowY: 'auto', paddingTop: 0, paddingBottom: 2 }}>
        {properties.map((prop) => (
          <ListItem
            key={prop.id}
            disablePadding
            className={styles.propertyItem}
          >
             {prop.icon && (
               <ListItemIcon className={styles.propertyIcon}>
                 {prop.icon}
               </ListItemIcon>
             )}
             <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
               <Typography variant="body2" className={styles.propertyLabel} sx={{ color: 'white' }}> {/* Changed color to white */}
                 {prop.label}
               </Typography>
               {/* Conditional Rendering: Show TextField or static value */}
               {editable && editingId === prop.id ? (
                 <ClickAwayListener onClickAway={handleInputBlur}>
                   <TextField
                     value={editValue}
                     onChange={handleValueChange}
                     // onBlur={handleInputBlur} // Handled by ClickAwayListener
                     onKeyDown={handleInputKeyDown}
                     variant="standard" // Use standard variant for less visual clutter
                     size="small"
                     autoFocus
                     fullWidth
                     className={styles.propertyValueInput}
                     InputProps={{ disableUnderline: true }} // Remove underline
                     sx={{ padding: 0 }} // Remove default padding if any
                   />
                 </ClickAwayListener>
               ) : (
                 <Typography
                   variant="body2"
                   className={styles.propertyValue}
                   onClick={() => handleEditClick(prop)}
                   sx={{ cursor: editable ? 'pointer' : 'default', color: '#ffffff' }} // Change cursor based on editable prop & Added sx color
                 >
                   {prop.value}
                 </Typography>
               )}
             </Box>
          </ListItem>
        ))}
      </List>
      {/* "Add a property" button removed as requested */}
    </Paper>
  );
};

export default NotionPropertiesSidebar;