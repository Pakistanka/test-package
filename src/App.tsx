import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {StakeBoost} from "./components/StakeBoost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <StakeBoost
        partner='addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr'
        signer='addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr'
        borrower='addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr'
      />
    </div>
  );
}

export default App;
