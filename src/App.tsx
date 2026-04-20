import { useState } from "react"
import { LoadingPage } from "./components/LoadingPage";
import { LanderPage } from "./components/LanderPage";

function App() {
  // == STATE ==
  const [showLoading, setShowLoading] = useState(true);
  const [showLander, setShowLander] = useState(true);

  return (
    <div id="content">
      {showLoading && <LoadingPage onFinish={() => setShowLoading(false)} />}
      {showLander && <LanderPage onFinish={() => setShowLander(false)} />}
      
    </div>
  )
}

export default App