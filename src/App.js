import WrapperContainer from "./container/WrapperContainer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <WrapperContainer />
      </Router>
    </div>
  );
}

export default App;
