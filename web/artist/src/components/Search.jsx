import React,{ useState,useEffect} from 'react'
import Usernav from "./Usernav"
import { 
    Redirect,
    Link
  } from "react-router-dom";


// eslint-disable-next-line
const arr=['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Toulon', 'Saint-Étienne', 'Le Havre', 'Grenoble', 'Dijon', 'Angers', 'Villeurbanne', 'Saint-Denis', 'Nîmes', 'Clermont-Ferrand', 'Le Mans', 'Aix-en-Provence', 'Brest', 'Tours', 'Amiens', 'Limoges', 'Annecy', 'Boulogne-Billancourt', 'Perpignan', 'Besançon', 'Metz', 'Orléans', 'Saint-Denis', 'Rouen', 'Argenteuil', 'Montreuil', 'Mulhouse', 'Caen', 'Nancy', 'Saint-Paul', 'Roubaix', 'Tourcoing', 'Nanterre', 'Vitry-sur-Seine', 'Nouméa', 'Créteil', 'Avignon', 'Poitiers', 'Aubervilliers', 'Dunkerque', 'Aulnay-sous-Bois', 'Colombes', 'Asnières-sur-Seine', 'Versailles', 'Saint-Pierre', 'Courbevoie', ,'Le Tampon', 'Cherbourg-en-Cotentin', 'Fort-de-France', 'Rueil-Malmaison', 'Béziers', 'Champigny-sur-Marne', 'Pau', 'La Rochelle', 'Saint-Maur-des-Fossés', 'Cannes', 'Calais', 'Antibes', 'Drancy', 'Mamoudzou', 'Ajaccio', 'Mérignac', 'Saint-Nazaire', 'Colmar', 'Issy-les-Moulineaux', 'Noisy-le-Grand', 'Évry-Courcouronnes', 'Vénissieux', 'Cergy', 'Levallois-Perret', 'Valence', 'Bourges', 'Pessac', 'Cayenne', 'Ivry-sur-Seine', 'Quimper', 'La Seyne-sur-Mer', 'Antony', "Villeneuve-d'Ascq", 'Clichy', 'Troyes', 'Montauban', 'Neuilly-sur-Seine', 'Pantin', 'Niort', 'Chambéry', 'Sarcelles', 'Le Blanc-Mesnil', 'Lorient', 'Saint-André', 'Beauvais', 'Maisons-Alfort', 'Meaux', 'Narbonne', 'Chelles', 'Hyères', 'Villejuif', 'Épinay-sur-Seine', 'La Roche-sur-Yon', 'Bobigny', 'Cholet', 'Bondy', 'Saint-Quentin', 'Fréjus', 'Saint-Louis', 'Vannes', 'Les Abymes', 'Clamart', 'Sartrouville', 'Fontenay-sous-Bois', 'Cagnes-sur-Mer', 'Bayonne', 'Sevran', 'Arles', 'Corbeil-Essonnes', 'Vaulx-en-Velin', 'Saint-Ouen-sur-Seine', 'Massy', 'Vincennes', 'Laval', 'Albi', 'Grasse', 'Suresnes', 'Montrouge', 'Martigues', 'Bastia', 'Gennevilliers', 'Aubagne', 'Belfort', 'Évreux', 'Brive-la-Gaillarde', 'Carcassonne', 'Saint-Priest', 'Saint-Malo', 'Charleville-Mézières', 'Saint-Herblain', 'Choisy-le-Roi', 'Rosny-sous-Bois', 'Blois', 'Meudon', 'Saint-Laurent-du-Maroni', 'Salon-de-Provence', 'Livry-Gargan', 'Puteaux', 'Chalon-sur-Saône', 'Saint-Germain-en-Laye', "Les Sables-d'Olonne", 'Alfortville', 'Châlons-en-Champagne', 'Mantes-la-Jolie', 'Noisy-le-Sec', 'Saint-Brieuc', 'La Courneuve', 'Sète', 'Châteauroux', 'Istres', 'Valenciennes', 'Garges-lès-Gonesse', 'Caluire-et-Cuire', 'Talence', 'Tarbes', 'Rezé', 'Bron', 'Castres', 'Angoulême', 'Arras', 'Le Cannet', 'Bourg-en-Bresse', 'Wattrelos', 'Bagneux', 'Alès', 'Boulogne-sur-Mer', 'Le ,Lamentin', 'Gap', 'Compiègne', 'Thionville', 'Melun', 'Douai', 'Gagny', 'Anglet', 'Montélimar', 'Draguignan', 'Colomiers', 'Stains', 'Marcq-en-Barœul', 'Chartres', "Saint-Martin-d'Hères", 'Poissy', 'Joué-lès-Tours', 'Pontault-Combault', 'Saint-Joseph', 'Villepinte', 'Saint-Benoît', 'Châtillon', 'Franconville', 'Échirolles', 'Savigny-sur-Orge', 'Villefranche-sur-Saône', 'Annemasse', 'Tremblay-en-France', 'Sainte-Geneviève-des-Bois', 'Dumbéa', 'Creil', 'Neuilly-sur-Marne', 'Conflans-Sainte-Honorine', 'Saint-Raphaël', 'Palaiseau', 'Bagnolet', ,'La Ciotat', "Villenave-d'Ornon", 'Thonon-les-Bains', 'Athis-Mons', 'Saint-Chamond', 'Montluçon', 'Haguenau', 'Auxerre', 'Villeneuve-Saint-Georges', 'Saint-Leu', 'Châtenay-Malabry', ,'Meyzieu', 'Saint-Martin', 'Roanne', 'Mâcon', 'Le Perreux-sur-Marne', 'Six-Fours-les-Plages', 'Le Port', 'Nevers', 'Sainte-Marie', 'Romans-sur-Isère', 'Vitrolles', 'Schiltigheim', 'Agen', 'Les Mureaux', 'Matoury', 'Nogent-sur-Marne', 'Marignane', 'La Possession', 'Montigny-le-Bretonneux', 'Cambrai', 'Houilles', 'Épinal', 'Koungou', 'Trappes', 'Châtellerault', 'Lens', 'Saint-Médard-en-Jalles', 'Vigneux-sur-Seine', 'Pontoise', "L'Haÿ-les-Roses", 'Le Chesnay-Rocquencourt', 'Baie-Mahault', 'Plaisir', 'Cachan', 'Pierrefitte-sur-Seine', 'Malakoff', 'Viry-Châtillon', 'Dreux', 'Goussainville', 'Bezons', 'Liévin', 'Rillieux-la-Pape', 'Chatou', 'Menton', 'Herblay-sur-Seine', 'Périgueux', 'Charenton-le-Pont', 'Saint-Cloud', 'Vandœuvre-lès-Nancy', 'Villemomble'].map(function(v) {
  return v.toLowerCase();
});
const Search = ({auth}) => {

    const [Info,setInfo] = useState([])
    const [search, setSearch] = useState("");

    useEffect(() => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({location:"all",public_id:localStorage.getItem("id"),artisttype:"Musicians"})
        };
        fetch('https://foronlyobsession.herokuapp.com/search', requestOptions)
            .then(response => response.json())
            .then((rep) => {
                setInfo(rep.data);
                console.clear() ;

            });
      },[])

      const submitForm = (e) => {
        e.preventDefault()
        // let data={location:e.target[1].value,public_id:localStorage.getItem("id"),artisttype:e.target[0].value}
        // console.log("data: ", data)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({location:e.target[1].value,public_id:localStorage.getItem("id"),artisttype:e.target[0].value})
      };
      fetch('https://foronlyobsession.herokuapp.com/search', requestOptions)
          .then(response => response.json())
          .then((rep) => {
              setInfo(rep.data)

          });
      };

      if (!auth.isAuthenticated()) {
        
      //  console.log( "switxchedd to not found ");
        return <Redirect to="/notfound"/>;

    }

    

    return (
        <div>
            <Usernav auth={auth}/>
<div className="page-wrapper">
  <div className="container-xl">
    <div className="page-header d-print-none">
      <div className="row align-items-center">
        <div className="col">
          <h2 className="page-title">
            Search results
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div className="page-body">
    <div className="container-xl">
      <div className="row">
        <div className="col-3">
          <form   onSubmit={submitForm}>
           
          <div className="subheader mb-2">Select artist</div>
            <div>
              <select name="artisttype" className="form-select">
              <option value="Musicians">Musicians(band, solo, DJ)</option>
            <option value="Dancer" >Dancer</option>
            <option value="Video_director">Video director</option>
            <option value="Photographer">Photographer</option>
            <option value="Magician">Magician</option>
            <option value="Clown">Clown</option>
              </select>
            </div>
            
           
            <div className="subheader mt-3 mb-2">filter by location</div>
            <div>
            
          <input 
          type="text" 
          list="ville"
          className="form-control " 
          placeholder="Enter Your location" 
           name="location" 
          
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
            <div className="mt-5">
              <button type="submit" className="btn btn-primary w-100">
                Confirm changes
              </button>
            
            </div>
          </form>
        </div>


        <div  className="col-9">
          <div className="row">
            { Info && <h1>  Results: </h1>}
        {  Info.map((user)=>( 
     
            <div key={user.public_id} className="col-sm-6 col-lg-4 mb-3">
              <div className="card card-sm">
                <Link to={`/${user.public_id}`} className="d-block">
                {/* // eslint-disable-next-line */}
                  <img  alt={""} style={{height:"20vw"}} src={user.imgcover ? `https://foronlyobsession.herokuapp.com/view/${user?.imgcover}`:"https://foronlyobsession.herokuapp.com/view/5"}   className="card-img-top" />
                  </Link>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <span className="avatar me-3 rounded" style={{backgroundImage:  user.imgprofile ? `url(https://foronlyobsession.herokuapp.com/view/${user?.imgprofile})`:`url(https://foronlyobsession.herokuapp.com/view/5)`}} />
                    <div>
                      <div>{user.firstName}</div>
                      <div className="text-muted">{user.typeofart}</div>
                    </div>
                  </div>
                </div>
              </div>
          
        </div> ))} 

        </div>
             </div>
      </div>
    </div>
  </div>
</div>


        </div>
    )
}

export default Search
