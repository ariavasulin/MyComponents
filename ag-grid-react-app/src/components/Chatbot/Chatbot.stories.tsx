import type { Meta, StoryObj } from '@storybook/react';
import { Chatbot } from './Chatbot';

// Define metadata for the story
const meta: Meta<typeof Chatbot> = {
  title: 'Components/Chatbot', // Storybook path
  component: Chatbot,
  parameters: {
    // Optional parameters: layout, backgrounds, etc.
    layout: 'centered',
  },
  tags: ['autodocs'], // Enable automatic documentation generation
};

export default meta;


// Define the story object type
type Story = StoryObj<typeof meta>;

// Define the default story
export const Default: Story = {
  args: {
    // Props for the Chatbot component can be added here if needed
    // Since our Chatbot component currently takes no props, this is empty
  },
};