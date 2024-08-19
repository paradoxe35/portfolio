import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function Highlighter({
  codeText,
  match,
  props,
}: {
  codeText: string;
  props: any;
  match: RegExpExecArray;
}) {
  return (
    <SyntaxHighlighter
      style={darcula as any}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {codeText}
    </SyntaxHighlighter>
  );
}
