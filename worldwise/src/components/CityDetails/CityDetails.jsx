import { useParams, useSearchParams } from "react-router-dom";

function CityDetails() {
  const params = useParams();
  const [searchquery] = useSearchParams();
  return (
    <div>
      <div>{params.id}</div>

      <div>lat:{searchquery.get("lat")}</div>
      <div>lng:{searchquery.get("lng")}</div>
    </div>
  );
}

export default CityDetails;
