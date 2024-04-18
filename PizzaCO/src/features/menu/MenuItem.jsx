import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addToCart,
  decreaseQuantity,
  getCurrentQuantity,
  increaseQuantity,
} from '../cart/CartSlice';
import Deletebtn from '../cart/Deletebtn';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id));
  function handleAddTOCart() {
    const cartitem = {
      id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addToCart(cartitem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut ? (
            !currentQuantity ? (
              <Button type="small" onclick={handleAddTOCart}>
                Add to cart
              </Button>
            ) : (
              <div
                style={{ display: 'flex', gap: '3px', alignItems: 'center' }}
              >
                <Button
                  type="rounded"
                  onclick={() => {
                    console.log('test', id);
                    dispatch(increaseQuantity(id));
                  }}
                >
                  +
                </Button>
                <span>{currentQuantity}</span>
                <Button
                  type="rounded"
                  onclick={() => dispatch(decreaseQuantity(id))}
                >
                  -
                </Button>
                <Deletebtn id={id}></Deletebtn>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
