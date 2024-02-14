import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Instruments from "./pages/Instruments.jsx";
import Albums from "./pages/Albums.jsx";
import Tracks from "./pages/Tracks.jsx";


function App() {
  // const { selectedTheme, selectedFomation } = useContext(FormationContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
        <Routes>
          <Route path="/" element={<Instruments />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
