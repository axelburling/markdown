import React from 'react'
import { v5 } from 'uuid'
import './download.css'

interface Props {
  doc: string
}

const Download: React.FC<Props> = props => {
  const sleep = (callback: () => void, ms?: number) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => {
          callback()
          resolve('Done')
        },
        ms ? ms : 200
      )
    })

  const downloadMdToFile = async (doc: string) => {
    const element = document.createElement('a')
    const file = new Blob([props.doc], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(file)
    element.href = url
    element.style.display = 'none'
    element.setAttribute('download', `${v5}.md`)

    if (typeof element.download === 'undefined') {
      element.setAttribute('target', '_blank')
    }

    document.body.appendChild(element)
    element.click()

    await sleep(() => {
      document.body.removeChild(element)
      URL.revokeObjectURL(url)
    }, 200)
  }

  return (
    <div className="dark">
      <a className="btn btn-white" onClick={() => downloadMdToFile(props.doc)}>
       Download
      </a>
    </div>
  )
}

export default Download
