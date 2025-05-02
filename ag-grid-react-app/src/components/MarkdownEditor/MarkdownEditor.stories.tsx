import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from './MarkdownEditor';
import { action } from '@storybook/addon-actions';

// Helper component to manage state for the story
const EditorWithState: React.FC<{ initialMarkdown: string }> = ({ initialMarkdown }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
    action('onChange')(newMarkdown); // Log changes to Storybook Actions panel
  }, []);

  return <MarkdownEditor markdown={markdown} onChange={handleChange} />;
};


const meta = {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {
    layout: 'fullscreen', // Use fullscreen to give editor more space
  },
  tags: ['autodocs'],
  argTypes: {
    // We control markdown via the EditorWithState wrapper now
    markdown: { table: { disable: true } },
    onChange: { action: 'onChange', table: { disable: true } },
    editorRef: { table: { disable: true } },
    editorProps: { table: { disable: true } },
  },
  // Render using the state wrapper for interactive editing
  render: (args) => <EditorWithState initialMarkdown={args.markdown || ''} />,

} satisfies Meta<typeof MarkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = `# Welcome to the MDX Editor!

This is a basic example using \`@mdxeditor/editor\`.

**Features:**

*   Basic toolbar (Undo/Redo, Bold, Italic, Underline, Lists, Block Types, Links)
*   Headings
*   Lists (ordered and unordered)
*   Links
*   Quotes
*   Thematic Breaks (horizontal rules)
*   Markdown shortcuts (like \`#\` for headings, \`*\` for lists)

Try editing this content! Changes are logged in the **Actions** tab below.
`;

export const Default: Story = {
  args: {
    markdown: defaultContent,
  },
};

export const Empty: Story = {
  args: {
    markdown: '',
  },
};

export const WithTableMarkdown: Story = {
    args: {
        markdown: `# Table Example

While the table *plugin* isn't enabled by default in this story, the editor can still display basic Markdown tables:

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

(To enable table editing, the \`tablePlugin\` would need to be added to the component).
        `
    }
};

export const WithCodeBlockMarkdown: Story = {
    args: {
        markdown: `# Code Block Example

Similarly, the code block plugin isn't enabled here, but basic fenced code blocks render:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

(Enable \`codeBlockPlugin\` and potentially \`codeMirrorPlugin\` for syntax highlighting and language selection).
        `
    }
};