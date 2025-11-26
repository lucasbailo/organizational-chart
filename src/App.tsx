import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrgChartPM } from "./Pages/OrgChartPM";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrgChartPM data={[]} />} />
      </Routes>
    </BrowserRouter>
  );
}
