import './Login.css';
import { useState, useContext } from 'react';
import ErrorModal from '../UI/ErrorModal';
import validator from 'validator';
import { UserContext } from '../..';

const Register = (props) => {
  const [emailReg, setEmailReg] = useState('');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [error, setError] = useState('');
  const userService = useContext(UserContext);

  const handleRegister = async () => {
    if (
      usernameReg.trim().length === 0 ||
      passwordReg.trim().length === 0 ||
      emailReg.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please do not leave fields blank.',
      });
      return;
    } else if (!validator.isEmail(emailReg)) {
      setError({
        title: 'Invalid input',
        message: 'Please use a valid email address.',
      });
      return;
    } else {
      await userService.register(usernameReg, passwordReg, emailReg);

      setEmailReg('');
      setUsernameReg('');
      setPasswordReg('');
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="login-register-container">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="text-center">
        <h2 className="login-register-header">Register</h2>
      </div>

      <form className="login-register-form">
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">E-mail</label>
          <div className="col-sm-9">
            <input
              className="form-control-login"
              type="text"
              value={emailReg}
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Username</label>
          <div className="col-sm-9">
            <input
              className="form-control-login"
              type="text"
              value={usernameReg}
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm-9">
            <input
              className="form-control-login"
              type="text"
              value={passwordReg}
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <input
            type="submit"
            className="login-btn"
            value="register"
            onClick={handleRegister}
          />

          <button className="login-btn" onClick={props.onCancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
