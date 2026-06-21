import { useState } from 'react'
import './App.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Loading from './Loading'

function App() {
  let [loadingStatus, setLoadingStatus] = useState(false)
  let [question, setQuestion] = useState('')
  let [data, setData] = useState('')

  let handleSubmit = (e) => {
    e.preventDefault()

    if (!question.trim()) {
      return
    }

    setLoadingStatus(true)
    axios.post('http://localhost:8000/ask', {question})
    .then((res)=>res.data)
    .then((finalRes) => {
        if(finalRes._status) {
          setData(finalRes.finalData)
        }
        setLoadingStatus(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadingStatus(false)
      })
  }

  let applyPrompt = (value) => {
    setQuestion(value)
  }

  return (
    <main className="app-shell">
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />

      <section className="hero-copy">
        <p className="eyebrow">We are online ...</p>
        <h1>Personal AI Chat App</h1>
        <p className="hero-text">
          A polished chat-style interface for quick prompts, clean replies, and
          a softer visual feel.
        </p>

        <div className="hero-pills">
          <button type="button" onClick={() => applyPrompt('Write a friendly welcome message for a new customer.')}>Yes, sure!</button>
          <button type="button" className="secondary-pill" onClick={() => applyPrompt('Write a polite short reply declining the offer.')}>No, Thanks</button>
        </div>
      </section>

      <section className="chat-card">
        <header className="chat-card__header">
          <div className="status-dot" />
          <div>
            <p>AI Assistant</p>
            <span>Usually replies in seconds</span>
          </div>
        </header>

        <div className="messages-panel">
          <div className="message message--assistant">
            Hi there. Ask me for content, code, copy, or a polished reply.
          </div>

          {question.trim() ? (
            <div className="message message--user">{question}</div>
          ) : null}

          <div className="message message--assistant message--response">
            {loadingStatus ? <Loading /> : <ReactMarkdown>{data || 'Your response will appear here.'}</ReactMarkdown>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="composer">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter message"
            rows="3"
          />
          <button type="submit" disabled={loadingStatus || !question.trim()}>
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
