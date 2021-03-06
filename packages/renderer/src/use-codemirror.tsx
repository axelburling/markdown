import { defaultKeymap } from '@codemirror/commands'
import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter'
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags
} from '@codemirror/highlight'
import { history, historyKeymap } from '@codemirror/history'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { indentOnInput } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { bracketMatching } from '@codemirror/matchbrackets'
import { EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%'
  }
})

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
])


interface Props {
  initialDoc: string
  onChange?: (state: EditorState) => void
}

export const useCodeMirror = <T extends Element>({
  onChange,
  initialDoc
}: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        }),
        oneDark,
        transparentTheme,
        syntaxHighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        })
      ]
    })

    const view = new EditorView({
        state: startState,
        parent: refContainer.current
    })
    setEditorView(view)

  }, [refContainer])

  return [refContainer, editorView]
}
