import React from 'react'
import Bio from './bio' 
import Spotify from './Spotify';



const Main = ({info}) => {

 

 const playliststyle={
   marginLeft:"20px",
  height:"60vh",
  width:"45vw",
  borderRadius:"20px",
  background: "#e0e0e0",
  boxShadow:  "-35px 35px 42px #7d7d7d,35px -35px 42px #ffffff"
 }
    return (
        <div className="container mt-5 ">
           <div className="row">
    <div className="col">
<Bio info={info}/>    </div>
    <div className="col ">
      {info.typeofart==="Musicians" ?
     (info.spotifyid 
     ?   <iframe title="My Daily Marathon Tracker" src={`https://open.spotify.com/embed/playlist/${info.spotifyid}`}  style={playliststyle} allowtransparency="true" allow="encrypted-media"></iframe> 

     : info.public_id !== localStorage.getItem("id") 
     ?<iframe className="playlist" title="My Daily Marathon Tracker" style={playliststyle} src={`https://www.youtube.com/embed/${info.youtubelink ? info.youtubelink : "tgbNymZ7vqY"}`}></iframe>
     : <Spotify/>
    )

  :<iframe className="playlist" title="My Daily Marathon Tracker" style={playliststyle} src={`https://www.youtube.com/embed/${info.youtubelink ? info.youtubelink : "tgbNymZ7vqY"}`}>
  </iframe>
}
      
    </div>
  </div>
        </div>
    )
}

export default Main
