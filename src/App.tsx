import { Route, Routes, BrowserRouter } from "react-router-dom";
import PasteSubmission from "./components/PasteSubmission";
import View from "./components/View";
import Header from "./components/Header";
import "./style.css";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/submit" element={<PasteSubmission />} />
          <Route path="/" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
