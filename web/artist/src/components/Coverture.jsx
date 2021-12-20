import React from 'react'

const Coverture = ({info}) => {
  // style={{ marginTop:"-20px"}}

  const bg= info.imgcover ? `url(https://foronlyobsession.herokuapp.com/view/${info?.imgcover})`:"url(https://foronlyobsession.herokuapp.com/view/5)";
  const profil= info.imgprofile ? `url(https://foronlyobsession.herokuapp.com/view/${info?.imgprofile})`:`url(https://foronlyobsession.herokuapp.com/view/5)`
    return (
        <div className="card card-link"  >
        <div className="card-cover  card-cover-blurred text-center shadow" style={{ backgroundImage: bg, height:"69vh"}}>
        </div>
        <div className="centered mb-2" >
          
        <span className="avatar  avatar-xl avatar-thumb avatlastnamear-rounded shadow " style={{ backgroundImage: profil , position:"absolute",top:"43vh" ,width:"12.5rem", height:"30vh"  }}></span>
        </div>
        <div className="mt-3 card-body text-center">

          <div className="card-title mb-1">{info?.lastname} {info?.firstName}</div>
          <div className="text-muted mb-2">{info?.typeofart}</div>
          <div className="text-muted mb-2">Email :   {info?.email}</div>
        { info?.typeofart !=="organizer" &&
         <div className="text-muted ">Prix: <div className=" btn btn-outline-info">{`${info?.prix}$/h` ||<strong style={{color:"green"}}>Please Update price from setting</strong>}</div></div>
       
    }
       </div>
      </div>
    )
}

export default Coverture
