import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
function CodeEditorApp() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`,
  );
  return (
    <CodeEditor
      value={code}
      language="typescript"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      data-color-mode="dark"
    />
  );
}

export default CodeEditorApp;
