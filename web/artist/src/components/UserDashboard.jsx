import React,{ useState,useEffect} from 'react'
import Usernav from "./Usernav"
import { 
    Redirect,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import Main from "./main"
  import Coverture from "./Coverture"
  import Copyright from "./Copyright"

function UserDashboard({auth}) {
    let { id } = useParams();
    let match = useRouteMatch();

    const [Info,setInfo] = useState({})

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id":id})
        };
        fetch('https://foronlyobsession.herokuapp.com/profile', requestOptions)
            .then(response => response.json())
            .then((rep) => {
      
                setInfo(rep.data);
                console.clear() ;

            });
            // eslint-disable-next-line
      },[match.url])
    //   useEffect(() => {

    //     console.log(Info.age);

    //   },[Info])

    if (!auth.isAuthenticated()) {
        
      //  console.log("switxchedd from dashhhhh");
        return <Redirect to="/notfound"/>;

    }


    const divStyle = {
    color: 'blue',
    background: '#F4F6FA',
  };        
 


    return (
        <div style={divStyle}>
            <Usernav auth={auth}/>
           <Coverture info={Info}/> 
 

            <Main info={Info}/>
            


        <Copyright className="mt-3"/>
        </div>
    )
}

export default UserDashboard
