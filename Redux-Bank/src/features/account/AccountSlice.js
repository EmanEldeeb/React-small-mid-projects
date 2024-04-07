import { type } from "@testing-library/user-event/dist/type";

const initialaccountstate = {
  balance: 0,
  loan: 0,
  loanpurpose: "",
  currency: "USD",
};

export default function accountReducer(state = initialaccountstate, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload.amount };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/getLoan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: state.loan + action.payload.amount,
        loanpurpose: action.payload.purpose,
      };
    case "account/payLoanback":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanpurpose: "",
      };
    default:
      return state;
  }
}

export function actionAccountDeposite(amount, currency) {
  if (currency === "USD")
    return { type: "account/deposite", payload: { amount, currency } };
  else
    return async function (dispatch, getstate) {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "account/deposite",
        payload: { amount: data.rates["USD"], currency },
      });
    };
}
export function actionAccountWithdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function actionAccountRequestloan(amount, purpose) {
  return { type: "account/getLoan", payload: { amount, purpose } };
}

export function actionPayLoan() {
  return { type: "account/payLoanback" };
}
