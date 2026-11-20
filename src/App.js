import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexHome from "./component/IndexHome";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
