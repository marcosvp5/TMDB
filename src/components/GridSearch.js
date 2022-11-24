
import Card from "./Card";
import { useSelector } from "react-redux";



function GridGeneral() {

const medias= useSelector((state) => state.search);


  return ( <div className="galery">
{medias && medias.map((media,i)=>{
  return <Card media={media} key={i}/>
})}
  </div>

  );
}

export default GridGeneral;