import {FC, ReactElement} from "react";

type TextWriterType = (line: string) => string;
type HtmlWriterType = (line: string, index: number) => ReactElement;
type Writer = TextWriterType | HtmlWriterType;

// 改行検出用
const regex = /(\n)/g;

export const Nl2Br: FC<{ text?: string, html?: string }> = ({text = '', html = ''}) => {
  const TextWriter: TextWriterType = (line) => line.trim();
  const HtmlWriter: HtmlWriterType = (line, index) => <span key={index} dangerouslySetInnerHTML={{__html: line.trim()}}/>;

  const [source, writer]: [string, Writer] =
            text !== ''
            ? [text, TextWriter]
            : [html, HtmlWriter];

  return (
      <>
        {source.trim().split(regex).map((line, index) => {
          if (line.match(regex)) {
            return <br key={index}/>
          } else {
            return writer(line, index);
          }
        })}
      </>
  );
}
