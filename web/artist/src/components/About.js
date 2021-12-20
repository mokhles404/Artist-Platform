import React from 'react'

function about() {
    return (
<section id="about" className="mb-5">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-push-6 text-center "> <img src="assets/about.png" alt={"about img"} /> </div>
      <div className="col-md-6 col-md-pull-6 border border-light ">
        <h6 className="display-5 text-danger mb-5 ">About me</h6>
        <h2 className="section_header mb-3">Info/Bio</h2>
        <p className="fontsize_20">At only 30 years of age, DJ has already established himself as the most successful american artist of the past two decades.</p>
        <p>American DJ and EDM producer DJ Bishop has released one studio album, and eight singles. Black sunglasses, a baseball cap flipped backwards, and his amazingly strong sense for hits that generate 9-digit streams and move crowds across the globe
          is what distinguishes him as an extremely talented and one of the most successful USA artists: Tyler Bishop. The Lower Saxony native is actually more the reserved type, who would much rather stand behind...</p>
        
      </div>
    </div>
  </div>
</section>


    )
}

export default about
