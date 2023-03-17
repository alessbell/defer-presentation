import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ codeString }) => {
  return (
    <SyntaxHighlighter language="javascript" style={nightOwl}>
      {codeString}
    </SyntaxHighlighter>
  );
};
