import React,{ useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Usernav from "./Usernav"
import { 
    Redirect
  } from "react-router-dom";




  const schema = yup.object().shape({
    current_password:yup.string().min(4).max(15).required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  });



const Setting = ({auth}) => {

    const [Info,setInfo] = useState({})
    // eslint-disable-next-line
    const { register, handleSubmit, errors } = useForm({
      resolver: yupResolver(schema),
    });
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

      
      const submitForm = (data) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"id":localStorage.getItem("id"),"data":data})
      };
      fetch('https://foronlyobsession.herokuapp.com/verif', requestOptions)
          .then(response => response.json())
          .then((rep) => {
              console.log(rep);
              
  
          }); 

        }

      if (!auth.isAuthenticated()) {
        
   //     console.log("switxchedd to not found ");
        return <Redirect to="/notfound"/>;
                                             }

    return (
        <div >
     <Usernav auth={auth} info={Info}/>
<div className="col-md-6 mt-5 container">
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">change password</h3>
    </div>
    <div className="card-body">
      <form    onSubmit={handleSubmit(submitForm)}>
      <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label">current password</label>
          <div className="col">
            <input type="password" className="form-control" name="current_password" placeholder="current password" ref={register}  />
            
          </div>
        </div>
        
        <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label">Password</label>
          <div className="col">
            <input type="password"  name="password" className="form-control" placeholder="Password" ref={register}  />
            
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label"> Repeat your Password</label>
          <div className="col">
            <input type="password" className="form-control"  name="confirmPassword" placeholder=" Repeat your Password" ref={register}  />
            
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>


        </div>
    )
}

export default Setting
