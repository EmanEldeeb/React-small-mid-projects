import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Deletebtn from './Deletebtn';
import {
  decreaseQuantity,
  getCurrentPrice,
  getCurrentQuantity,
  increaseQuantity,
} from './CartSlice';
import Button from '../../ui/Button';

function CartItem({ item }) {
  const { pizzaId, name } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));
  const currentPrice = useSelector(getCurrentPrice(pizzaId));
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {currentQuantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(currentPrice)}</p>

        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          <Button
            type="rounded"
            onclick={() => {
              dispatch(increaseQuantity(pizzaId));
            }}
          >
            +
          </Button>
          <span>{currentQuantity}</span>
          <Button
            type="rounded"
            onclick={() => dispatch(decreaseQuantity(pizzaId))}
          >
            -
          </Button>
          <Deletebtn id={pizzaId}></Deletebtn>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
