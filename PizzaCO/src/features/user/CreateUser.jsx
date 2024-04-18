import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { createUser } from '../../redux/UserSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { userName: userNameGlobal } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(createUser(username));
    setUsername('');
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      {!userNameGlobal ? (
        <>
          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />

          {username !== '' && (
            <div>
              <Button type="primary">Start ordering</Button>
            </div>
          )}
        </>
      ) : (
        <Button to="/menu" type={'primary'}>
          continue shopping
        </Button>
      )}
    </form>
  );
}

export default CreateUser;
