import { getMenu } from "../../Service/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((item) => (
        <MenuItem pizza={item} key={item.id}></MenuItem>
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();

  return menu;
}
export default Menu;
