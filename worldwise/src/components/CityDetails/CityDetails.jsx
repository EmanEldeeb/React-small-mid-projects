import { useParams } from "react-router-dom";

function CityDetails() {
  const params = useParams();
  console.log(params);
  return <div>{params.id}</div>;
}

export default CityDetails;
