import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import taskList from "markdown-it-task-lists";
import footnote from "markdown-it-footnote";
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
import deflist from "markdown-it-deflist";
import ins from "markdown-it-ins";
import mark from "markdown-it-mark";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import hljs from "highlight.js";
import { ReactNode } from "react";

export const renderMarkdown = (content: string): ReactNode => {
  const md = new MarkdownIt();
  return md
    .set({
      typographer: true,
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }
        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    })
    .use(emoji)
    .use(taskList)
    .use(footnote)
    .use(abbr)
    .use(container, "warning", {
      validate: function (params: string) {
        return params.trim().match(/^warning/);
      },
    })
    .use(container, "spoiler", {
      validate: function (params: string) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
          // opening tag
          return (
            "<details><summary>" + md.utils.escapeHtml(m[1]) + "</summary>\n"
          );
        } else {
          // closing tag
          return "</details>\n";
        }
      },
    })
    .use(deflist)
    .use(ins)
    .use(mark)
    .use(sub)
    .use(sup)
    .render(content);
};
