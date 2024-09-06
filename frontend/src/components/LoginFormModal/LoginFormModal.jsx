import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.setSessionUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoLogin = () => {
    const credential = 'Demo-lition';
    const password = 'password'
    return dispatch(sessionActions.setSessionUser({ credential, password }))
    .then(closeModal)
  }

  return (
    <>
    <div className='login-detail-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='logInHead'>Log In</h1>
          <div className='usernameInput'>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className='usernameInput'>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {errors.credential && (
            <p className='error'>{errors.credential}</p>
          )}
          <div className='entryButtons'>
            <button type="submit">Log In</button>
            <button className='DemoLogin' onClick={demoLogin}>Demo User</button>
          </div>
        </form>
      <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
    </div>
    </>
  );
}

export default LoginFormModal;
