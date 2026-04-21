import { useState } from "react"
import { LoadingPage } from "./components/LoadingPage";
import { LanderPage } from "./components/LanderPage";
import { Game } from "./components/Game";

function App() {
  // == STATE ==
  const [showLoading, setShowLoading] = useState(true);
  const [showLander, setShowLander] = useState(true);
  const [game, setGame] = useState(false);

  return (
    <div id="content">
      {showLoading && <LoadingPage onFinish={() => setShowLoading(false)} />}

      {showLander && <LanderPage onFinish={() => {
        setShowLander(false);
        setGame(true);
      }} />}
      
      {game && 
        <Game
          setGame={setGame}
          setShowLander={setShowLander}
        />
      }
    </div>
  )
}

export default App