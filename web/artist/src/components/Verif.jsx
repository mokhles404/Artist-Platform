import React,{useState} from 'react'
import { 
  useHistory,
  useParams,
} from "react-router-dom";



const Verif = () => {
  const [error, setError] = useState("")
  const [code,setcode]=useState() ;
  let { id } = useParams();
  let history = useHistory();


  const resend = (e) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"id":id,"clientcode":code})
  };
  fetch('https://foronlyobsession.herokuapp.com/resend', requestOptions)
      .then(response => response.json())
      .then((rep) => {
          console.log(rep);
          

      }); 
    
    
    
  }
  const sendcode = (e) => {
    e.preventDefault()
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"id":id,"clientcode":code})
  };
  fetch('https://foronlyobsession.herokuapp.com/confirm', requestOptions)
      .then(response => response.json())
      .then((rep) => {
          if(rep.msg ==="correct"){
            history.push("/login")
          }else 
          {
            setError(rep.msg)

          }
          

      }); 
    
  }
    return (
        <div className="container d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
          <h1 className="" style={{width:"100%", position:"relative",top:"-9vh" ,fontFamily:"Arial, Helvetica, sans-serif"}}>Check Your email to get your confirmation code </h1>

          <div className=" " style={{width:"35vw",height:"100%"}}>
            <label className=" d-flex justify-content-center form-label mb-3" style={{fontSize:"2.5vw",color:"#00004C",paddingTop:"30vh"}}>Insert Your code</label>
            {error && <h3 className="text-center text-danger">{error}</h3>}

            <input type="number" onChange={(e)=>setcode(e.target.value)} className=" d-flex justify-content-center form-control form-control-rounded mb-2 "  name="clientcode" placeholder="Your confirmation code .."></input>

            <div className=" d-flex justify-content-center  pt-4">
                        <a href=""   onClick={(e)=>resend(e)} className=" d-flex justify-content-center btn btn-primary w-100">
                          resend
                        </a>
                      </div>
            <div className=" d-flex justify-content-center  mt-4">
                        <a href="" onClick={(e)=>sendcode(e)} className=" d-flex justify-content-center btn btn-success w-100">
                          confirm
                        </a>
                      </div>
                      </div>
        </div>
    )
}

export default Verif
