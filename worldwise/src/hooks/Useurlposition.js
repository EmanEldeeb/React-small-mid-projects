import { useSearchParams } from "react-router-dom";

export function Useurlposition() {
  const [searchquery] = useSearchParams();
  const maplat = searchquery.get("lat");
  const maplng = searchquery.get("lng");
  return [maplat, maplng];
}
