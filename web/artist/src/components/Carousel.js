import React from 'react'

function Carousel() {
  const mystyle = {
    marginBottom: "40px",
    
    
  };
  const fontstyle = {
    cursor: "pointer",
    fontSize:"4vw",

  }
    return (
       
<div id="carousel-captions" className="carousel slide " style={mystyle} data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item position-relative"  >
      <img className="d-block w-100" alt={"carousel img"} src="assets\first.jpg" />
      <div className="carousel-item-background d-none d-md-block" />
      <div className="carousel-caption  d-md-block" style={fontstyle} >
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div className="carousel-item active carousel-item-start"   >
      <img className="d-block w-100" alt={"carousel img"} src="assets\first.jpg" />
      <div className="carousel-item-background d-none d-md-block"  />
      <div className="carousel-caption  d-md-block"  style={fontstyle}>
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div className="carousel-item carousel-item-next carousel-item-start"   >
      <img className="d-block w-100" alt={"carousel img"} src="assets\first.jpg" />
      <div className="carousel-item-background d-none d-md-block" />
      <div className="carousel-caption d-md-block"  style={fontstyle}>
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>


  </div>
  <a className="carousel-control-prev" href="#carousel-captions" role="button" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carousel-captions" role="button" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </a>
</div>


    )
}

export default Carousel
