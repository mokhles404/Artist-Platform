import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

// import Topnav from "./components/Topnav";
import Carousel from "./components/Carousel";
import About from "./components/About";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import Login from './components/login';
import Navbar from './components/Navbar';
import Singup from "./components/Singup";
import auth from "./components/auth";
import UserDashboard from "./components/UserDashboard";
import Notfound from "./components/Notfound";
import Status from "./components/Status";
import Setting from "./components/Setting";
import Search from "./components/Search";
import Spotify from "./components/Spotify";
import Verif from './components/Verif';

function App() {
  return (
    <div className="App" >

      <Router>
        {/* <Topnav/> */}
        {/* <Nav/> */}


        <div>


          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Navbar />

              <Carousel />
              <About />
              <Footer />
              <Copyright />
            </Route>
            <Route exact path="/login">
              <Navbar />

              <Login auth={auth} />

            </Route>
            <Route exact path="/singup">
              <Navbar />

              <Singup auth={auth} />
            </Route>
            <Route  path="/spotify">
              <Spotify />
            </Route>
            <Route exact path="/confirmation/:id">
              <Verif auth={auth} />         
          </Route>

            <Route exact path="/:id">
     
              <UserDashboard auth={auth} />
            </Route>

            <Route exact path="/:id/status">
     
            <Status auth={auth} />
          </Route>


          <Route exact path="/:id/setting">  
     
            <Setting auth={auth} />
          </Route>
          
          <Route exact path="/:id/search">
     
          <Search auth={auth} />

          </Route>

         
            
           <Route exat path="/*">
              <Notfound auth={auth} />
            </Route> 

          </Switch>
        </div>


      </Router>

    </div>
  );
}





export default App;
