import CreateCustomer from "./features/Custmor/CreateCustomer";
import Customer from "./features/Custmor/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import { useSelector } from "react-redux";
function App() {
  const { name } = useSelector((store) => store.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {name ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
