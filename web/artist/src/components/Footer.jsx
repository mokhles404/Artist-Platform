import React,{useState} from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({

  email: yup.string().email("Must be a valid email address").required(),
  message: yup.string().min(4,'Must be More than 4 caractere').max(60,"must be less than 60 caractere").required(),
});


function Footer() {
  const [Reponse,setReponse] = useState()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
})

const submitForm = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
};
fetch('https://foronlyobsession.herokuapp.com/contact', requestOptions)
.then(response => response.json())
.then((rep) => {
    if(rep.msg ==="correct"){
      setReponse("thanks for contact us")
    }else 
    {
      setReponse(rep.msg)

    }
    

}); 

}

    return (
<footer className=" text-white border-danger" style={{backgroundColor:"#332E3C"}} id="contactus">
  <div className="container">
    <div className="row p-5">
      <div className="col-md-4 text-center " >
        <div className="widget widget_text" style={{marginRight:"2vw "}} > <img alt={"logo"} src="assets/logo/logo4.png"  />
          <p className="mt-4" style={{color:"#A29587"}}>You can purchase my music albums, where you will find all my tracks, on iTunes, Google Play, Amazon, Spotify or SoundCloud.</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 text-center">
        <div className="container">
          <h4 className="text-center mt-3 h2" style={{color:"#EAE0CC"}}> Contact Form </h4>
          <form className="contact-form mb-3 mt-4" onSubmit={handleSubmit(submitForm)} >
            {Reponse && <h3 style={{color:"green"}}> {Reponse}</h3>}
            <div className="mb-3">
               <label htmlFor="name-footer ">Your adresse email </label> 
               <p style={{color:"red"}}>  {errors.email?.message} </p>

               <input type="text" ref={register}  aria-required="true"  name="email" id="name-footer" className="form-control mt-3 text-dark text-center" placeholder="adresse email" /> </div>
            <div className="mt-3">
              
              <label htmlFor="message-footer">Message</label> 
              <p style={{color:"red"}}>  {errors.message?.message} </p>

              <textarea aria-required="true" rows={3} ref={register}  cols={45} name="message" id="message-footer" className="form-control mt-3 text-dark text-center" placeholder="Message..."  /> </div>
            <div className="contact-form-submit mt-4">
            <button href="." className="btn btn-danger w-100"  type="submit">
                        Send Message</button> </div>
          </form>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 text-center">
        <div className="widget widget_text">
          <h4 className="text-center h2 mt-3 mb-5" style={{color:"#EAE0CC"}}> My Contacts </h4>
          <div>
            <div className="media small-media inline-block ">
              <div className="media-left"> <i className="fa fa-map-marker highlight" aria-hidden="true" /> </div>
              <div className="media-body " style={{color:"#846C5B"}}> Some Adress, Some City, CA 47812 </div>
            </div>
            <div className="media small-media inline-block">
              <div className="media-left"> <i className="fa fa-phone highlight" aria-hidden="true" /> </div>
              <div className="media-body" style={{color:"#846C5B"}}> 1-888-123-5896 </div>
            </div>
            <div className="media small-media inline-block">
              <div className="media-left"> <i className="fa fa-print highlight" aria-hidden="true" /> </div>
              <div className="media-body" style={{color:"#846C5B"}}> Some Adress, Some City, CA 47812 </div>
            </div>
            <div className="media small-media greylinks inline-block">
              <div className="media-left"> <i className="fa fa-envelope highlight" aria-hidden="true" /> </div>
              <div className="media-body mt-5" > <a href="mailto:dj_bishop_fan@example.com" style={{color:"#C4B2BC", textDecoration: 'none'}}>OnlyObssecion@gmail.com</a> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

    )
}

export default Footer
