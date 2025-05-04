# Active Context

  This file tracks the project's current status, including recent changes, current goals, and open questions.
  2025-05-01 21:13:44 - Log of updates made.

*

## Current Focus

*   [2025-05-02 02:27:01] - Implement the Notion-style properties sidebar component (`NotionPropertiesSidebar.tsx`) according to the approved plan. Start with Phase 1: Component Setup & Static Display using Material UI.
*   [2025-05-02 02:58:22] - Refactor `MarkdownEditor` component to use `@mdxeditor/editor`, providing basic Markdown editing functionality. Full MDX component embedding still needs configuration/implementation if required.

## Recent Changes

*   [2025-05-02 12:14:17] - Installed `react-contexify` library and imported its CSS in `.storybook/preview.ts`.
*   [2025-05-02 12:42:01] - Installed Material UI packages (@mui/material, @emotion/react, @emotion/styled).
*   [2025-05-02 12:43:43] - Replaced `react-contexify` with `@mui/material/Menu` for context menu in `SimpleGrid.itories.tsx`.
*   [2025-05-02 12:59:37] - Reverted context menu in `SimpleGrid.tsx` from AG Grid implementation back to MUI placeholders and fixed related TS errors.
*   [2025-05-02 01:09:38] - Fixed AG Grid `checkboxSelection` deprecation: Removed `checkboxSelection: true` from `SimpleGrid.stories.tsx` colDef, updated `SimpleGrid.tsx` to use `rowSelection={{ mode: '...', checkboxes: true }}` prop, and corrected related TS types/values in both files.
*   [2025-05-02 01:25:50] - Updated `Header.tsx` to use `DWLogo_white+transparent.png` image instead of SVG. Updated `header.css` to set background to `#2e2e2e`, text to white, removed border, and styled the new logo image.
*   [2025-05-02 01:26:44] - Fixed logo rendering issue in `Header.tsx` by importing the image asset and using the imported variable in the `src` attribute.
*   [2025-05-02 01:27:48] - Updated `header.css` to set the text color of buttons within the header to white.
*   [2025-05-02 01:28:44] - Removed the "Sign up" button from `Header.tsx` and the corresponding `onCreateAccount` arg from `Header.stories.ts`.
*   [2025-05-02 02:27:01] - Finalized plan for Notion-style properties sidebar component.
*   [2025-05-02 02:56:17] - Created basic Markdown rendering component (`MarkdownEditor.tsx` and `MarkdownEditor.stories.tsx`) using `react-markdown` and `remark-gfm`. Installed dependencies. (Replaced by MDXEditor)
*   [2025-05-02 02:58:22] - Refactored `MarkdownEditor.tsx` and `MarkdownEditor.stories.tsx` to use `@mdxeditor/editor`. Installed dependency. Implemented basic Markdown editing toolbar and functionality.

*   [2025-05-02 03:11:11] - Implemented nested collapsible menu functionality in `CollapsibleSidebar` using MUI `Collapse`, state for nested items, and updated rendering logic based on a hierarchical data structure.
*   [2025-05-02 03:09:42] - Refactored `CollapsibleSidebar` toggle: Removed standalone button, consolidated toggle logic into the `DrawerHeader`'s `IconButton`. Updated `DrawerHeader` styles to center the icon (`justifyContent: 'center'`) when collapsed (`!open`) to fix alignment issue.
*   [2025-05-02 03:08:34] - Further adjusted `CollapsibleSidebar`: Implemented explicit `display: open ? 'none' : 'inline-flex'` logic for the open (`MenuIcon`) button and `display: open ? 'inline-flex' : 'none'` for the close (`ChevronLeftIcon`) button to ensure only one is visible at a time, resolving the overlap issue.
*   [2025-05-02 03:07:36] - Adjusted `CollapsibleSidebar`: Wrapped component in a Box with `minHeight: '100vh'` for full height and changed toggle button position to `fixed` to prevent overlap when collapsed. Fixed syntax errors from previous diff attempts.
*   [2025-05-02 03:04:56] - Created basic CollapsibleSidebar component and story using MUI Drawer (`ag-grid-react-app/src/components/CollapsibleSidebar/`).
*   [2025-05-04 14:11:00] - Created static Chatbot component (`Chatbot.tsx`) and Storybook story (`Chatbot.stories.tsx`) in `ag-grid-react-app/src/components/Chatbot/` using `@assistant-ui/react` primitives. Installed dependency.
*   [2025-05-04 14:16:25] - Updated `Chatbot.tsx` static mock with inline styles resembling ChatGPT light theme. Removed `@assistant-ui/react` primitives due to Storybook context issues and simplified Storybook story (`Chatbot.stories.tsx`) by removing the runtime provider decorator.
## Open Questions/Issues

*
*   [2025-05-02 12:11:00] - Modified `SimpleGrid.tsx` to accept a `rowSelection` prop ('single' | 'multiple'). Modified `SimpleGrid.stories.tsx` to add a checkbox selection column, enable 'multiple' row selection by default, and add a Storybook control for `rowSelection`.
*   [2025-05-02 12:53:38] - Implemented AG Grid context menu actions (Add Row Below, Delete Selected, Copy Selected) directly within `SimpleGrid.tsx` using the `getContextMenuItems` callback and internal `gridApi` reference. Removed reliance on external `onCellContextMenu` prop for these actions.
*   [2025-05-02 02:57:09] - Clarification received: User requires a full MDX editor, including editing and embedding React components.
*   [2025-05-02 02:58:22] - How should custom React components be registered or configured for use within the `MarkdownEditor` using `@mdxeditor/editor`? (Requires further investigation or specific plugin configuration like `jsxPlugin` or `directivesPlugin`).