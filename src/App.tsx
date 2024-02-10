import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
// import { Button } from "./components/Button";
import {StakeBoost} from "./components/StakeBoost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Button /> */}
      <StakeBoost />
    </div>
  );
}

export default App;
