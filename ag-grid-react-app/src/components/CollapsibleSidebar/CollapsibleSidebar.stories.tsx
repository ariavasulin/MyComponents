import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof CollapsibleSidebar> = {
  title: 'Components/CollapsibleSidebar',
  component: CollapsibleSidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen', // Use fullscreen to better represent dashboard layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
        control: 'text', // Allow editing children content in Storybook controls
        description: 'Content to display in the main area next to the sidebar.',
        defaultValue: 'Main Content Area',
      },
  },
  decorators: [
    (Story) => (
      // Provide basic theme context if needed, or rely on global decorators
      // For fullscreen layout, often no extra wrapper is needed unless specific theme setup is required.
      <Story />
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the sidebar
export const Default: Story = {
  args: {
    // Pass children as React nodes if more complex content is needed
    children: (
        <Box>
            <Typography variant="h4">Dashboard Content</Typography>
            <Typography paragraph>
                This is the main content area next to the collapsible sidebar.
                You can put any components or content here. The sidebar can be toggled
                using the menu icon when collapsed or the chevron icon when open.
            </Typography>
        </Box>
    )
  },
};

// Story to show the sidebar initially collapsed (though state is internal)
// We can't directly control the internal 'open' state via args without modifying the component.
// This story serves mainly as documentation or for visual testing setup if needed.
export const InitiallyClosed: Story = {
    args: {
      children: (
          <Box>
              <Typography variant="h4">Content (Sidebar Starts Closed)</Typography>
              <Typography paragraph>
                  This story renders the same component, but ideally, it would start closed.
                  Since the open/closed state is managed internally by useState, we cannot directly
                  set it via Storybook args without component changes (e.g., passing an `initialOpen` prop).
                  Click the menu icon to open it.
              </Typography>
          </Box>
      )
    },
    // You might add a play function here if you want to automate closing it for testing:
    // play: async ({ canvasElement }) => {
    //   const canvas = within(canvasElement);
    //   // Find the close button (chevron) and click it if the sidebar is open by default
    //   // This requires the sidebar to be open initially to find the chevron button
    //   // Adjust selector based on actual implementation details
    //   const closeButton = await canvas.findByLabelText(/close drawer/i); // Or use a more specific selector
    //   await userEvent.click(closeButton);
    // },
  };