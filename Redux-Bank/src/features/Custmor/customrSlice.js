// const initialCustmorState = {
//   name: "",
//   nationalid: "",
// };

// export default function custmorReducer(state = initialCustmorState, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         name: action.payload.name,
//         nationalid: action.payload.nationalid,
//       };

//     default:
//       return state;
//   }
// }

// export function actionCreateUser(name, id) {
//   return { type: "customer/create", payload: { name: name, nationalid: id } };
// }

// redux toolkit
import { createSlice } from "@reduxjs/toolkit";
const initialCustmorState = {
  name: "",
  nationalid: "",
};
const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustmorState,
  reducers: {
    createUser: {
      prepare(fullName, nationalId) {
        return { payload: { fullName, nationalId } };
      },
      reducer(state, action) {
        state.name = action.payload.fullName;
        state.nationalid = action.payload.nationalId;
      },
    },
  },
});

export default customerSlice.reducer;
export const { createUser } = customerSlice.actions;
