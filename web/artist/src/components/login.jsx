import React, { useState } from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Redirect, useHistory,Link } from "react-router-dom";

const schema = yup.object().shape({

    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
});


function Login({ auth }) {

    // eslint-disable-next-line
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const [errorlog, seterrorlog] = useState("");
      let history = useHistory();

    const submitForm = (data) => {
        // console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('https://foronlyobsession.herokuapp.com/login', requestOptions)
            .then(response => response.json())
            .then((rep) => {
                if(rep.message==="exist" && rep.confirmation==="yes"){
                auth.login(() => {
       

                    localStorage.setItem('myData', data.email);
                    localStorage.setItem('id', rep.id);

                    localStorage.setItem('loginstate', "true");

                    
                    // history.push("/dash");
                    // console.log(auth.isAuthenticated());
                    // <Redirect to="/dash" />;

                }); 
                history.push(`/${rep.id}`) ;

            }
            else if(rep.message==="exist" && rep.confirmation==="no"){
                history.push(`/confirmation/${rep.id}`) ;

            }
            else {
                seterrorlog("email or password incorrect") ;

            }
            });

    };


   
    if (auth.isAuthenticated()) {
        return <Redirect to={`/${localStorage.getItem("id") || "notfound"}`}/>;
    
    }
    return (
        <div className="flex-fill d-flex flex-column justify-content-center py-4">
            <div className="container-tight py-6">
                <div className="text-center mb-4">
                    <a href="."><img alt={"logo"} src="assets/logo/logo3.png" height={76} /></a>
                </div>
                <form className="card card-md" onSubmit={handleSubmit(submitForm)}>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Login to your account</h2>
                        { errorlog && <p className="pb-3   text-red text-center"> {errorlog} </p>}

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" placeholder="Enter email" ref={register} />
                            {/* <p> {errors.email?.message} </p> */}

                        </div>
                        <div className="mb-2">
                            <label className="form-label">
                                Password
            {/* <span className="form-label-description">
                                <a href="./forgot-password.html">I forgot password</a>
                            </span> */}
                            </label>
                            <div className="input-group input-group-flat">
                                <input type="password" className="form-control" name="password" placeholder="Password" ref={register} />

                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="btn btn-primary w-100">Sign in</button>
                        </div>
                    </div>

                </form>

                
            
                <div className="text-center text-muted mt-3">
                    Don't have account yet? <Link to="/singup" tabIndex={-1}>Sign up</Link>
                </div>
            </div>
        </div>)

}

export default Login
