import React from 'react';
import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface MarkdownEditorProps {
  /**
   * The initial markdown content to display/edit
   */
  markdown: string;
  /**
   * Callback function triggered when the markdown content changes
   * @param newMarkdown The updated markdown string
   */
  onChange?: (newMarkdown: string) => void;
  /**
   * Optional ref for accessing editor methods
   */
  editorRef?: React.ForwardedRef<MDXEditorMethods>;
  /**
   * Pass through other MDXEditorProps if needed
   */
  editorProps?: Omit<MDXEditorProps, 'markdown' | 'plugins' | 'onChange' | 'ref'>;
}

/**
 * Primary UI component for editing Markdown content using MDXEditor
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdown,
  onChange,
  editorRef,
  editorProps,
}) => {
  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      ref={editorRef}
      plugins={[
        // Basic text formatting toolbar
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <BlockTypeSelect />
              <CreateLink />
            </>
          ),
        }),
        // Essential plugins
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        // Add other plugins here as needed (e.g., code blocks, tables, jsx)
      ]}
      {...editorProps}
      // Add contentEditableClassName for potential styling hooks
      contentEditableClassName="prose" // Example using Tailwind typography class
    />
  );
};