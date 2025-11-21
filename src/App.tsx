
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Adpage from "./Pages/AdPage";
import HomePage from "./Pages/HomePage";
import Subscription from "./Pages/Subscription";



const App = () => {
  return (
    <>  
    <Router>
      <Routes>
        <Route path='/' element={<Adpage/>}/>
        <Route path='/Subscription' element={<Subscription/>}/>
        <Route path='/homePage' element={<HomePage/>}/>
      </Routes>
    </Router>
    </>

)};

export default App;
