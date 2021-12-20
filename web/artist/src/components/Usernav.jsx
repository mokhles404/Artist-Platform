import React,{useState,useEffect} from 'react'
import {
  useHistory,
  Link,
} from "react-router-dom";




const Usernav = ({auth}) => {
  let history = useHistory();
  const [info,setinfo] = useState({})

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id":localStorage.getItem("id")})
    };
    fetch('https://foronlyobsession.herokuapp.com/profile', requestOptions)
        .then(response => response.json())
        .then((rep) => {
  
            setinfo(rep.data);
            console.clear() ;

        });
// console.log(id,"hetha liner loul")
  },[])




  const logout=(e)=>{

    auth.logout(()=>{
      //  console.log("lougout ");
        window.localStorage.clear();
       
    })
  
        history.push("/");
}




    return (

  <header className="navbar navbar-expand-md navbar-dark d-print-none" style={{background: ' #12343b'}}>
    <div className="container-xl">
   
      <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <Link to={`/${info.public_id}`}>
          <img src="/assets/logo/logo4.png" width={60} height={60} alt="Tabler" className="navbar-brand-image" />
        </Link>
      </h1>
      <div className="navbar-nav flex-row order-md-last">
        
        <div className="nav-item dropdown">
          <Link to={`/${info.public_id}`} className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
            <span className="avatar avatar-sm" style={{backgroundImage:  `url(https://foronlyobsession.herokuapp.com/view/${info?.imgprofile})`}} />
            <div className="d-none d-xl-block ps-2">
              <div>{info?.firstName || 'no first name'}</div>
              <div className="mt-1 small text-muted">{info?.typeofart}</div>
            </div>
          </Link>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <Link to={`/${info.public_id}/status`} className="dropdown-item">Set status</Link>
           {info?.typeofart ==="organizer" && <Link to={`/${info.public_id}/search`} className="dropdown-item">Search</Link> }
            <div className="dropdown-divider" />
            <Link to={`/${info.public_id}/setting`} className="dropdown-item">Settings</Link>
            <Link to="/" className="dropdown-item"  onClick={logout}>Logout</Link>
          </div>
        </div>
      </div>

    </div>
  </header>

    )
}

export default Usernav
