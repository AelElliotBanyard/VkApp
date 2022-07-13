import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Mine from "./Mine";
import Open from "./Open";
import Person from "./Person";

function Main(props) {
    
    const MainPage = () => {
        return (
            <div>
                <Sidebar/>
                <div className="main">
                    <h1>Dies ist die Hauptseite für Rang V</h1>
                </div>
            </div>
        )
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/open" element={<Open/>}/>
                <Route path="/person" element={<Person username={props.username}/>}/>
                <Route path="/mine" element={<Mine username={props.username}/>}/> 
                <Route path="/*" element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main;