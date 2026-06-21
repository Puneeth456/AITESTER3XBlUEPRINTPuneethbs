import { useState } from 'react'
import Header from './components/Header'
import RicePotForm from './components/RicePotForm'
import TestStrategyOutput from './components/TestStrategyOutput'
import JiraPanel from './components/JiraPanel'
import { generateTestStrategy } from './tools/groqClient'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showJira, setShowJira] = useState(false)

  const handleGenerate = async fields => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await generateTestStrategy(fields)
      setResult(data)
      setTimeout(() => {
        document.getElementById('output-anchor')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="main">
        <div className="container">
          <RicePotForm onGenerate={handleGenerate} isLoading={isLoading} />

          {isLoading && (
            <div className="loading-state">
              <div className="loading-orb" />
              <p>Groq AI is analyzing your RICE-POT configuration...</p>
              <p className="loading-sub">llama-3.3-70b-versatile · up to 4096 tokens</p>
            </div>
          )}

          {error && (
            <div className="error-banner">
              <span>⚠️</span>
              <div>
                <p className="error-title">Generation Failed</p>
                <p className="error-msg">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div id="output-anchor">
              <TestStrategyOutput
                result={result}
                onPushToJira={() => setShowJira(true)}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>AI Test Generator · Powered by Groq AI · llama-3.3-70b-versatile</p>
      </footer>

      {showJira && result?.testCases?.length > 0 && (
        <JiraPanel
          testCases={result.testCases}
          onClose={() => setShowJira(false)}
        />
      )}
    </div>
  )
}
