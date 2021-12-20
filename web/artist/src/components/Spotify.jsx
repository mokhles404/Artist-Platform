import React,{useEffect} from 'react'
import axios from "axios"
import {
    useHistory
  } from "react-router-dom"




function Spotify() {
    const history = useHistory();

const url = "https://accounts.spotify.com/authorize"
const clientid = "c84b2a03d27e49cda830256259d5b458"
// const redirect_uri="http://localhost:3000/spotify"
const redirect_uri="http://myonlyobsession.herokuapp.com/spotify"
const scope=[
    "user-read-playback-state"
,"user-read-currently-playing",
"user-read-email ",
"playlist-read-private"
]
const scopeurl =scope.join("%20")


    const handellogin = () => {
        window.location= `${url}?client_id=${clientid}&redirect_uri=${redirect_uri}&scope=${scopeurl}&response_type=token&show_dialog=true` 
    }
    
    const returnedparms = (hash) => {
        const hashstring= hash.substring(1)
        const parametersurl = hashstring.split("&")
        const parameterobj= parametersurl.reduce((acc,current)=>{
            const [key ,value] =current.split("=")
            acc[key]=value
            return acc
        },{})

        return parameterobj
    }


  
const getPlaylist =  (token) => {
    const apiurl= "https://api.spotify.com/v1/me/playlists"
   // console.log("token==   ",token)
    axios.get(apiurl, {
        headers:{
            Authorization: "Bearer "+ token ,
        }
    })
    .then((response)=>{
         const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id":localStorage.getItem("id"),"spotifyid":response.data.items[0].id})
        };
        fetch('https://foronlyobsession.herokuapp.com/spotify', requestOptions)
          
 
    })
    .catch((error)=>{
         console.log(error) 
    })
  }



    useEffect(()=>{
        if (window.location.hash){
            const {access_token,expires_in,token_type}=returnedparms(window.location.hash)
            localStorage.setItem("access_token",access_token)
            localStorage.setItem("expires_in",expires_in)
            localStorage.setItem("token_type",token_type)
            getPlaylist(access_token)
            history.push("/login")
             

        }
    })
   

    return (
        <div className=" container">
            <h1>
                spotify title 
            </h1>
            <button onClick={handellogin}>
            login to spotify
            </button>

        </div>
    )
}

export default Spotify
