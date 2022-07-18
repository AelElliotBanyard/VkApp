import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../../standard/Sidebar";
import Mine from "../../standard/Mine";
import Open from "../../standard/Open";
import Person from "../../standard/Person";

function Main(props) {
    
    const MainPage = () => {
        return (
            <div>
                <Sidebar/>
                <div className="main">
                    <h1>Dies ist die Hauptseite für Rang DC</h1>
                </div>
            </div>
        )
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/VkApp/" element={<MainPage/>}/>
                <Route path="/VkApp/open" element={<Open/>}/>
                <Route path="/VkApp/person" element={<Person username={props.username} uid={props.uid}/>}/>
                <Route path="/VkApp/mine" element={<Mine username={props.username}/>}/> 
                <Route path="/VkApp/*" element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main;