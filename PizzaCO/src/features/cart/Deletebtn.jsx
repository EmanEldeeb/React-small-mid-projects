import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteCartItem } from './CartSlice';

function Deletebtn({ id }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="small"
      onclick={() => {
        dispatch(deleteCartItem(id));
      }}
    >
      Delete
    </Button>
  );
}

export default Deletebtn;
