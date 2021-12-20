import React from 'react'

const Bio = ({info}) => {
  const biotstyle={
  marginRight:"20px",
  borderRadius:"15px",
  background: "#e0e0e0",
  boxShadow:  "-35px 35px 42px #7d7d7d,35px -35px 42px #ffffff"
 }
    return (
        <div className="col-12"  >
                            <div className="card " style={biotstyle}>
                              <div className="card-status-top bg-danger"></div>
                              <div className="card-body">
                                <h3 className="card-title">Bio</h3>
                                <p>{info?.bio || <strong style={{color:"green"}}>Please Update Your bio</strong>}</p>
                                
                              </div>
                            </div>
                          </div>


        
    )
}

export default Bio
