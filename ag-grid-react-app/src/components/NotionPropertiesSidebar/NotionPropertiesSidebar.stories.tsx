import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; // Import fn for action logging

import { NotionPropertiesSidebar } from './NotionPropertiesSidebar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/NotionPropertiesSidebar',
  component: NotionPropertiesSidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered', // Keep it aligned left for sidebar feel
    backgrounds: { // Add background control for dark theme testing
        default: 'light',
        values: [
          { name: 'light', value: '#ffffff' },
          { name: 'dark', value: '#2e2e2e' },
        ],
      },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    properties: { control: 'object' }, // Allow editing properties array in Storybook controls
    onAddProperty: { action: 'addPropertyClicked' }, // Log action when button is clicked
    onPropertyChange: { action: 'propertyChanged' }, // Log action when property changes
    editable: { control: 'boolean' }, // Add boolean control for editable prop
  },
  // Use `fn` to spy on the callbacks, which will appear in the actions panel once invoked
  args: {
    onAddProperty: fn(),
    onPropertyChange: fn(),
    editable: true, // Default to editable in stories
   },
} satisfies Meta<typeof NotionPropertiesSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story uses initial data from component
export const Default: Story = {
  args: {
    // editable: true // Inherits default from args
  },
};

// Story with custom properties
export const CustomProperties: Story = {
    args: {
        properties: [
            { id: 'status', label: 'Status', value: 'In Progress', icon: '🚀' },
            { id: 'assignee', label: 'Assignee', value: 'Roo', icon: '👤' },
            { id: 'dueDate', label: 'Due Date', value: '2025-05-10', icon: '📅' },
        ],
        // editable: true // Inherits default from args
    },
};

// Story demonstrating non-editable state
export const NotEditable: Story = {
    args: {
        properties: [ // Use different data to show it clearly
            { id: 'status', label: 'Status', value: 'Completed', icon: '✅' },
            { id: 'assignee', label: 'Assignee', value: 'Aria', icon: '👩‍💻' },
        ],
        editable: false, // Explicitly set editable to false
    },
};