import 'github-markdown-css/github-markdown.css'
import idk from 'highlight.js'
import marked from 'marked'
import React from 'react'
import Download from './download'
import './preview.css'

interface Props {
  doc: string
}

const Preview: React.FC<Props> = props => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const hljs = idk;
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })

  const md = marked(props.doc)

  return (
    <>
    <div
      className="preview markdown-body"
      dangerouslySetInnerHTML={{ __html: md }}
    >

    </div>
    <Download doc={props.doc} />
    </>
  )
}

export default Preview
