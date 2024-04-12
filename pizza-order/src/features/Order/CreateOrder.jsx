import { useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const actiondata = useActionData();
  const { state } = useNavigation();
  const issubmitting = state === "submitting";

  console.log("ca", actiondata);
  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method="post">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {actiondata?.phone && <div>{actiondata?.phone}</div>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <button disabled={issubmitting}>
            {issubmitting ? "submitting" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority ? true : false,
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length) return errors;

  const response = await fetch(
    "https://react-fast-pizza-api.onrender.com/api/order",
    {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const {
    data: { id },
  } = await response.json();
  console.log(id);
  // return redirect(`/order/${id}`);
  return null;
}

export default CreateOrder;
