const initialCustmorState = {
  name: "",
  nationalid: "",
};

export default function custmorReducer(state = initialCustmorState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        name: action.payload.name,
        nationalid: action.payload.nationalid,
      };

    default:
      return state;
  }
}

export function actionCreateUser(name, id) {
  return { type: "customer/create", payload: { name: name, nationalid: id } };
}
