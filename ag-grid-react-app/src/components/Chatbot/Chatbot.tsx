import React from 'react';

// Define a type for the content part
type ContentPart = {
  type: 'text';
  text: string;
};

// Define a type for the message structure
type StaticMessage = {
  id: string;
  role: 'user' | 'assistant';
  createdAt: Date; // Keep for potential future use, though not displayed
  content: ContentPart[];
};

// Define the Chatbot component using plain HTML for static mock
export const Chatbot: React.FC = () => {
  // Static messages array
  const staticMessages: StaticMessage[] = [
    { id: '1', role: 'user', createdAt: new Date(), content: [{ type: 'text', text: 'Hello, chatbot!' }] },
    { id: '2', role: 'assistant', createdAt: new Date(), content: [{ type: 'text', text: 'Hello there! How can I help you today?' }] },
    { id: '3', role: 'user', createdAt: new Date(), content: [{ type: 'text', text: 'Tell me a joke.' }] },
    { id: '4', role: 'assistant', createdAt: new Date(), content: [{ type: 'text', text: 'Why don’t scientists trust atoms? Because they make up everything!' }] },
  ];

  // --- ChatGPT-like Styles ---

  const chatContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '500px', // Increased height
    width: '100%',   // Use full width
    maxWidth: '768px', // Max width like ChatGPT
    margin: 'auto',   // Center container
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff', // White background
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', // Common UI font
  };

  const viewportStyle: React.CSSProperties = {
    flexGrow: 1, // Take available space
    padding: '20px', // More padding
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column', // Stack messages vertically
    gap: '15px', // Space between messages
  };

  const messageStyle = (role: 'user' | 'assistant'): React.CSSProperties => ({
    padding: '10px 15px', // Adjusted padding
    borderRadius: '18px', // More rounded corners
    backgroundColor: role === 'user' ? '#d1e9ff' : '#f0f0f0', // User: light blue, Assistant: light gray
    color: '#1f1f1f', // Darker text
    maxWidth: '80%',
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start', // Align bubbles
    wordWrap: 'break-word',
    lineHeight: '1.5', // Improve readability
  });

  const authorStyle: React.CSSProperties = {
    fontWeight: '600',
    marginRight: '8px',
    display: 'block', // Put author on its own line for clarity
    marginBottom: '4px',
    fontSize: '0.9em',
    color: '#555', // Slightly muted author color
  };

  const composerStyle: React.CSSProperties = {
    padding: '15px 20px', // Padding around composer
    borderTop: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center', // Vertically align items
    gap: '10px', // Space between input and button
  };

  const inputStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '12px 15px', // More padding in input
    border: '1px solid #dcdcdc',
    borderRadius: '18px', // Rounded input
    fontSize: '1em',
    outline: 'none', // Remove default outline
  };

   const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '18px', // Rounded button
    backgroundColor: '#a0a0a0', // Muted background for disabled
    color: '#ffffff',
    cursor: 'not-allowed',
    fontSize: '1em',
    fontWeight: '500',
  };

  // --- Component Return ---

  return (
    <div style={chatContainerStyle}> {/* Main container */}
      <div style={viewportStyle}>
        {/* Map over static messages and render styled divs */}
        {staticMessages.map((message) => (
          <div key={message.id} style={messageStyle(message.role)}>
            <span style={authorStyle}>{message.role === 'user' ? 'User' : 'Assistant'}</span>
            {message.content.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }
              return null; // Handle other types if needed
            })}
          </div>
        ))}
      </div>
      {/* Basic Composer - Visually present but not functional */}
      <div style={composerStyle}>
        <input type="text" placeholder="Type your message..." style={inputStyle} disabled />
        <button style={buttonStyle} disabled>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;