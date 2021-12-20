import React,{ useState,useEffect} from 'react'
import Usernav from "./Usernav"
import { 
    Redirect
  } from "react-router-dom";
  

const Status = ({auth}) => {
    const [Info,setInfo] = useState({})
    const [profilepic,setprofilepic] = useState()
    const [coverpic,setcoverpic] = useState()
    const [statu,setstatu] = useState("")
    const [Youtube,setYoutube] = useState("")
    const [Price,setPrice] = useState(0)
    const [Name,setName] = useState("")
    const [Lastname,setLastname] = useState("")
    const [Msg,setMsg] = useState()

    

    useEffect(() => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id":localStorage.getItem("id")})
        };
        fetch('https://foronlyobsession.herokuapp.com/profile', requestOptions)
            .then(response => response.json())
            .then((rep) => {
                setInfo(rep.data);
                console.clear() ;

            });
      },[])

      if (!auth.isAuthenticated()) {
        
        console.log("switcched to not found ");
        return <Redirect to="/notfound"/>;

    
    }
    const updatestatus = (e)=> {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id":localStorage.getItem("id"),"bio":statu})
    };
    fetch('https://foronlyobsession.herokuapp.com/bio', requestOptions)
        .then(response => response.json())
        .then((rep) => {
            console.log(rep);
            

        });    }





        const updateprice = (e)=> {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id":localStorage.getItem("id"),"prix":Price})
        };
        fetch('https://foronlyobsession.herokuapp.com/bio', requestOptions)
            .then(response => response.json())
            .then((rep) => {
                console.log(rep);
                
    
            });    }  


            const updatename =(e)=> {
        
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"id":localStorage.getItem("id"),"name":Name,"last_name":Lastname})
            };
            fetch('https://foronlyobsession.herokuapp.com/bio', requestOptions)
                .then(response => response.json())
                .then((rep) => {
                    console.log(rep);
                    
        
                }); 
            }

            const updateprofilepic=(e)=>{

                const formData = new FormData() ;
                formData.append('pic', profilepic) ;
                formData.append('id', localStorage.getItem("id"))

                const requestOptions = {
                    method: 'POST',
                    // headers: { 'Content-Type': 'application/json' },
                    body: formData
                };
                fetch('https://foronlyobsession.herokuapp.com/uploadprofile', requestOptions)
                    .then(response => response.json())
                    .then((rep) => {
                        console.log(rep);                        
                    }); 
            }



            const updatecoverpic = (e)=>{

                const formData = new FormData() ;
                formData.append('pic', coverpic) ;
                formData.append('id', localStorage.getItem("id"))

                const requestOptions = {
                    method: 'POST',
                    // headers: { 'Content-Type': 'application/json' },
                    body: formData
                };
                fetch('https://foronlyobsession.herokuapp.com/uploadcover', requestOptions)
                    .then(response => response.json())
                    .then((rep) => {
                        console.log(rep);                        
                    }); 
            }
            

            const updateYoutube = (e) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"id":localStorage.getItem("id"),"youtubelink":Youtube})
                };
                fetch('https://foronlyobsession.herokuapp.com/youtube', requestOptions)
                    .then(response => response.json())
                    .then((rep) => {
                        console.log(rep);
                        
            
                    }); 
                
            }
            









              return (
        <div>
          <Usernav auth={auth} info={Info}/>
      <div className="container">  
      
      
      <label className="form-label mt-3 mb-3" style={{ position: 'relative',left: '50%' ,marginRight:"100%",width: '30%'}} >Update your bio </label>

<div className="input-icon  mb-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}>

<span className="input-icon-addon">
{/* Download SVG icon from http://tabler-icons.io/i/user */}
<svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={12} cy={7} r={4} /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
</span>
<input type="text" className="form-control" placeholder="Username" onChange={(e)=> setName(e.target.value)}  />
</div>
<div className="input-icon  mb-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}>

<span className="input-icon-addon">
{/* Download SVG icon from http://tabler-icons.io/i/user */}
<svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={12} cy={7} r={4} /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
</span>
<input type="text" className="form-control" placeholder="Last name"  onChange={(e)=> setLastname(e.target.value)} />
</div>

<div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
<button className="btn btn-success btn-pill w-100" onClick={(e)=>updatename(e)} >
Update user
</button>
                 </div>
<div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>




{Info?.typeofart !=="organizer" && 
    <>
<label className="form-label mt-3 mb-3" style={{ position: 'relative',left: '50%' ,marginRight:"100%",width: '30%'}} >Update your price </label>

<input type="text" className="form-control" name="example-text-input"    onChange={(e)=> setPrice(e.target.value)}  placeholder="price per hour"  style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>

<div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
<button className="btn btn-success btn-pill w-100" onClick={(e)=>updateprice(e)} >
Update price
</button>
                 </div>
<div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>
</>



}

      
      
            <div className="mt-3 container">
            <div style={{position: 'relative'}}>
  <label className="form-label mb-3" style={{ position: 'relative',left: '50%' ,marginRight:"100%",width: '30%'}} >Update your bio </label>
  <textarea className="form-control" name="example-textarea-input" onChange={(e)=> setstatu(e.target.value)} style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}} rows={6} placeholder="Descirbe yourself.."/>
  <div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
                        <button className="btn btn-success btn-pill w-100" onClick={(e)=>updatestatus(e)} >
                          Update Bio
                          </button>
                                                </div></div></div>

                                                <div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>

                                                <div className="mt-3 container">
            <div style={{position: 'relative'}}>
  <label className="form-label mb-3" style={{ position: 'relative',left: '48%' ,marginRight:"100%",width: '30%'}} >Update your profile picture </label>
  <input type="file" className="form-control" accept="image/*" onChange={(e)=> setprofilepic(e.target.files[0])} style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>
  <div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
                        <button className="btn btn-success btn-pill w-100" onClick={(e)=>updateprofilepic(e)} >
                          Update picture
                          </button>
                                                </div></div></div>

                                                <div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>


                                                <div className="mt-3 container">
            <div style={{position: 'relative'}}>
  <label className="form-label mb-3" style={{ position: 'relative',left: '48%' ,marginRight:"100%",width: '30%'}} >Update your Coverture  </label>
  <input type="file" className="form-control" accept="image/*" onChange={(e)=> setcoverpic(e.target.files[0])} style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>
  <div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
                        <button className="btn btn-success btn-pill w-100" onClick={(e)=>updatecoverpic(e)} >
                          Update picture
                          </button>
                                                </div></div></div>

                                                <div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>




                                                <div className="dropdown-divider mt-3" style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>





<label className="form-label mt-3 mb-3" style={{ position: 'relative',left: '50%' ,marginRight:"100%",width: '30%'}} >Update Youtube Link </label>

<input type="text" className="form-control" name="example-text-input"    onChange={(e)=> setYoutube(e.target.value)}  placeholder="Your Youtube Link"  style={{position: 'relative',left: '20%',width: '60%' ,marginLeft:"53"}}/>

<div className="col-6 col-sm-4 col-md-2 col-xl mt-3" style={{ position: 'relative',left: '48%'}}>
<button className="btn btn-success btn-pill w-100" onClick={(e)=>updateYoutube(e)} >
Update Youtube Link
</button>
                 </div>


</div>


        </div>
    )
}

export default Status
