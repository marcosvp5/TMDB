import { Link } from "react-router-dom";

const Card = ({media, type})=>{
const content= media.data ? media.data : media
const imageUrl= "https://image.tmdb.org/t/p/w300"+content.poster_path;
const id= content.id

return (<>
 <div class="card">
     <img src={imageUrl}/>
      <div class="card-content">
        <h2>{content.title}</h2>
        <p>
          {content.overview}
        </p>
        <Link to={`/simpleview/${id}/${type}`}>
        <a href="#" class="btn"
          > Ver más info
          <i class="las la-long-arrow-alt-right"></i>
        </a>
</Link>
      </div>
    </div>
    </>)
}

export default Card