import React, { useCallback, useState } from 'react'
import './app.css'
import Editor from './editor'
import Preview from './preview'

const App: React.FC = () => {
    const [doc, setDoc] = useState<string>('# Hello, World!\n')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])
    return (
        <div className="app">
          {/* <Sidebar /> */}
           <Editor onChange={handleDocChange} initialDoc={doc} />
           <Preview doc={doc} />
        </div>
    )
}

export default App
