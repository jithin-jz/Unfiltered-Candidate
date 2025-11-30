import { SpeedInsights } from "@vercel/speed-insights/react"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <SpeedInsights />
      <App />
    </>
  </StrictMode>
)
