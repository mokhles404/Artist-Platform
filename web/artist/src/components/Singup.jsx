import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "../Singup.css"
import {
useHistory,
Redirect,
Link
} from "react-router-dom"
import {  useState  } from 'react';
// eslint-disable-next-line
const arr=['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Toulon', 'Saint-Étienne', 'Le Havre', 'Grenoble', 'Dijon', 'Angers', 'Villeurbanne', 'Saint-Denis', 'Nîmes', 'Clermont-Ferrand', 'Le Mans', 'Aix-en-Provence', 'Brest', 'Tours', 'Amiens', 'Limoges', 'Annecy', 'Boulogne-Billancourt', 'Perpignan', 'Besançon', 'Metz', 'Orléans', 'Saint-Denis', 'Rouen', 'Argenteuil', 'Montreuil', 'Mulhouse', 'Caen', 'Nancy', 'Saint-Paul', 'Roubaix', 'Tourcoing', 'Nanterre', 'Vitry-sur-Seine', 'Nouméa', 'Créteil', 'Avignon', 'Poitiers', 'Aubervilliers', 'Dunkerque', 'Aulnay-sous-Bois', 'Colombes', 'Asnières-sur-Seine', 'Versailles', 'Saint-Pierre', 'Courbevoie', ,'Le Tampon', 'Cherbourg-en-Cotentin', 'Fort-de-France', 'Rueil-Malmaison', 'Béziers', 'Champigny-sur-Marne', 'Pau', 'La Rochelle', 'Saint-Maur-des-Fossés', 'Cannes', 'Calais', 'Antibes', 'Drancy', 'Mamoudzou', 'Ajaccio', 'Mérignac', 'Saint-Nazaire', 'Colmar', 'Issy-les-Moulineaux', 'Noisy-le-Grand', 'Évry-Courcouronnes', 'Vénissieux', 'Cergy', 'Levallois-Perret', 'Valence', 'Bourges', 'Pessac', 'Cayenne', 'Ivry-sur-Seine', 'Quimper', 'La Seyne-sur-Mer', 'Antony', "Villeneuve-d'Ascq", 'Clichy', 'Troyes', 'Montauban', 'Neuilly-sur-Seine', 'Pantin', 'Niort', 'Chambéry', 'Sarcelles', 'Le Blanc-Mesnil', 'Lorient', 'Saint-André', 'Beauvais', 'Maisons-Alfort', 'Meaux', 'Narbonne', 'Chelles', 'Hyères', 'Villejuif', 'Épinay-sur-Seine', 'La Roche-sur-Yon', 'Bobigny', 'Cholet', 'Bondy', 'Saint-Quentin', 'Fréjus', 'Saint-Louis', 'Vannes', 'Les Abymes', 'Clamart', 'Sartrouville', 'Fontenay-sous-Bois', 'Cagnes-sur-Mer', 'Bayonne', 'Sevran', 'Arles', 'Corbeil-Essonnes', 'Vaulx-en-Velin', 'Saint-Ouen-sur-Seine', 'Massy', 'Vincennes', 'Laval', 'Albi', 'Grasse', 'Suresnes', 'Montrouge', 'Martigues', 'Bastia', 'Gennevilliers', 'Aubagne', 'Belfort', 'Évreux', 'Brive-la-Gaillarde', 'Carcassonne', 'Saint-Priest', 'Saint-Malo', 'Charleville-Mézières', 'Saint-Herblain', 'Choisy-le-Roi', 'Rosny-sous-Bois', 'Blois', 'Meudon', 'Saint-Laurent-du-Maroni', 'Salon-de-Provence', 'Livry-Gargan', 'Puteaux', 'Chalon-sur-Saône', 'Saint-Germain-en-Laye', "Les Sables-d'Olonne", 'Alfortville', 'Châlons-en-Champagne', 'Mantes-la-Jolie', 'Noisy-le-Sec', 'Saint-Brieuc', 'La Courneuve', 'Sète', 'Châteauroux', 'Istres', 'Valenciennes', 'Garges-lès-Gonesse', 'Caluire-et-Cuire', 'Talence', 'Tarbes', 'Rezé', 'Bron', 'Castres', 'Angoulême', 'Arras', 'Le Cannet', 'Bourg-en-Bresse', 'Wattrelos', 'Bagneux', 'Alès', 'Boulogne-sur-Mer', 'Le ,Lamentin', 'Gap', 'Compiègne', 'Thionville', 'Melun', 'Douai', 'Gagny', 'Anglet', 'Montélimar', 'Draguignan', 'Colomiers', 'Stains', 'Marcq-en-Barœul', 'Chartres', "Saint-Martin-d'Hères", 'Poissy', 'Joué-lès-Tours', 'Pontault-Combault', 'Saint-Joseph', 'Villepinte', 'Saint-Benoît', 'Châtillon', 'Franconville', 'Échirolles', 'Savigny-sur-Orge', 'Villefranche-sur-Saône', 'Annemasse', 'Tremblay-en-France', 'Sainte-Geneviève-des-Bois', 'Dumbéa', 'Creil', 'Neuilly-sur-Marne', 'Conflans-Sainte-Honorine', 'Saint-Raphaël', 'Palaiseau', 'Bagnolet', ,'La Ciotat', "Villenave-d'Ornon", 'Thonon-les-Bains', 'Athis-Mons', 'Saint-Chamond', 'Montluçon', 'Haguenau', 'Auxerre', 'Villeneuve-Saint-Georges', 'Saint-Leu', 'Châtenay-Malabry', ,'Meyzieu', 'Saint-Martin', 'Roanne', 'Mâcon', 'Le Perreux-sur-Marne', 'Six-Fours-les-Plages', 'Le Port', 'Nevers', 'Sainte-Marie', 'Romans-sur-Isère', 'Vitrolles', 'Schiltigheim', 'Agen', 'Les Mureaux', 'Matoury', 'Nogent-sur-Marne', 'Marignane', 'La Possession', 'Montigny-le-Bretonneux', 'Cambrai', 'Houilles', 'Épinal', 'Koungou', 'Trappes', 'Châtellerault', 'Lens', 'Saint-Médard-en-Jalles', 'Vigneux-sur-Seine', 'Pontoise', "L'Haÿ-les-Roses", 'Le Chesnay-Rocquencourt', 'Baie-Mahault', 'Plaisir', 'Cachan', 'Pierrefitte-sur-Seine', 'Malakoff', 'Viry-Châtillon', 'Dreux', 'Goussainville', 'Bezons', 'Liévin', 'Rillieux-la-Pape', 'Chatou', 'Menton', 'Herblay-sur-Seine', 'Périgueux', 'Charenton-le-Pont', 'Saint-Cloud', 'Vandœuvre-lès-Nancy', 'Villemomble'].map(function(v) {
  return v.toLowerCase();
});


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    firstName: yup.string().min(3).max(10).required("First Name should be required please").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    lastName: yup.string().min(3).max(10).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    location: yup.mixed().oneOf(arr),
    email: yup.string().email().required(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    age: yup.number().min(4).max(80).positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    select:yup.mixed().oneOf(['Musicians', 'organizer','Dancer', 'Video_director', 'Photographer','Magician', 'Clown'])
  });

function Singup({auth}) {
 

    // eslint-disable-next-line
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
      });
      const [errorsing, seterrorsing] = useState("");
      

      let history = useHistory();
      const [search, setSearch] = useState("");

      const submitForm = (data) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };
      fetch('https://foronlyobsession.herokuapp.com/singup', requestOptions)
          .then(response => response.json())
          .then((rep) => {
            if (rep.message==="exist"){
            
            seterrorsing("Same address email is already registred") ;

          }
          else {
           // console.log(rep)
           // console.log(`/confirmation/${rep.public_id}`)
            //history.push("/login");    
            history.push(`/confirmation/${rep.public_id}`);  
           
           
           }
            
            
        });



      };
      if (auth.isAuthenticated()) {
        
       
        return <Redirect to={`/${localStorage.getItem("id") || "notfound"}`}/>;
    
    }
      

    return (
<div className="flex-fill d-flex flex-column justify-content-center py-4">
  <div className="container-tight py-8">
    <div className="text-center mb-3">
      <Link to="."><img alt={"logo"} src="assets/logo/logo3.png" height={76} /></Link>
    </div>
    <form  className="card card-md"  onSubmit={handleSubmit(submitForm)}>
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Create new account</h2>
        { errorsing && <p className="pb-3   text-red text-center"> {errorsing} </p>}

        <div className="mb-3">
        <p className="text-center text-danger">  {errors.firstName?.message} </p>

          <label className="form-label">Name</label>

          <input type="text" className="form-control" name="firstName" placeholder="Enter name" ref={register} />
        </div>
      
        <div className="mb-3">
        <p className="text-center text-danger">  {errors.lastName?.message} </p>

          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" placeholder="Last Name"  ref={register}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group input-group-flat">
            <input type="password" className="form-control" placeholder="Password" name="password" ref={register} />
           
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <div className="input-group input-group-flat">
            <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" ref={register} />
           
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email"name="email" className="form-control" placeholder="Enter email" ref={register}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Your Phone Number</label>
          <input type="tel" className="form-control" placeholder="Enter your number"  name="phoneNumber" ref={register} />
        </div>
        <div className="mb-3">
          <label className="form-label">Your age</label>
          <input type="number" className="form-control" placeholder="Enter Your age"  name="age" ref={register} />
        </div>





        <div className="mb-3">
        <label className="form-label">Select le nom de votre ville</label>

          <input 
          type="text" 
          list="ville"
          className="form-control " 
          placeholder="Enter Your location" 
           name="location" 
          ref={register}
          value={search}
          onChange={event => setSearch(event.target.value.toLowerCase())}
          />
            <datalist id="ville">

        {arr
          .filter(( name ) => name.toLowerCase())
          .map((value, i) => {
            
            return <option key={i} value={value} />
          
          })}

          </datalist>

        </div>
   

        <div className="mb-3" >
          <label className="form-label">Select Category of artists </label>
          <select className="form-select" name="select" aria-label="Default select example" ref={register}>
            <option value="Musicians">Musicians(band, solo, DJ)</option>
            <option value="organizer">organizer</option>
            <option value="Dancer" >Dancer</option>
            <option value="Video_director">Video director</option>
            <option value="Photographer">Photographer</option>
            <option value="Magician">Magician</option>
            <option value="Clown">Clown</option>
          </select>
        </div>
 
    
        <div className="form-footer">
          <button type="submit" className="btn btn-primary w-100" >Create new account</button>
        </div>
      </div>
    </form>
    <div className="text-center text-muted mt-3">
      Already have account? <Link to="/login" tabIndex={-1}>Sign in</Link>
    </div>
  </div>

 
</div>


    )
}

export default Singup
