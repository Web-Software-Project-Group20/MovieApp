import React, { useState, useEffect } from 'react';
import { useLogin } from '../contexts/LoginContext';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../settingsComponents/ErrorHandler'
import { MdClose } from "react-icons/md";


const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContent = styled.div`
background: linear-gradient(to bottom, rgba(27, 47, 52, 0.80) 0%, rgba(7, 27, 32, 0.80) 100%);padding: 20px;
  border-radius: 3px;
  height: 500px;
  width: 350px;
`;

const FillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30%
  `;

const CloseButton = styled.button`
  background: transparent;
  color: #EEF1DC;
  font-size: 20px;
  border: none;
  cursor: pointer;
  margin-left: 325px;
`;

const ToggleButtonContainer = styled.div`
padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  font-size: 21px;
`;

const ToggleButton = styled.button`
  background: transparent;
  font-family: Montserrat;
  color: #EEF1DC;
  border: none;
  padding: 8px;
  margin: 0 20px 10px;
  cursor: pointer;
  font-size: inherit;
  font-weight: ${(props) => (props.active === 'true' ? 'bolder' : 'normal')};
  color: ${(props) => (props.active === 'true' ? '#bc9a44' : '#B3BAAE')};
  border-bottom: ${(props) => (props.active === 'true' ? '1px solid #bc9a44;' : 'none')}
`;

const Label = styled.label`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: 14px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  margin-left: 40px;
  margin-right: 40px;
  background: transparent;
  padding: 10px;
  margin-bottom: 18px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #F3F3E760;
  color: #F3F3E7;
`;

const SubmitButton = styled.button`
  width: 170px;
  height: 40px;
  background: #14333D;
  color: #EEF1DC;
  border: none;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0.5rem;
  cursor: pointer;
  position: fixed;
  bottom: 250px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background: #172E35;
  }
`;

const SubmitButtonContainer = styled.div`
  display: grid;
  place-items: center;

`;

const SignInSignUpModal = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset the input fields when the modal is opened
    if (isOpen) {
      setUsername('');
      setPassword('');
      setEmail('');
      setIsSignIn(true); // Set the default view to Sign In
    }
  }, [isOpen]);

  const handleSignIn = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/users/signin', { uname: username, pw: password }, { withCredentials: true })
      .then(() => {
        login();
        onClose();
        navigate('/');
      })
      .catch((error) => {
        setError({ message: error.response.data.error })
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleSignUp = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/users/signup',
      {
        uname: username,
        pw: password,
        email: email
      },
      { withCredentials: true })
      .then(() => {
        login();
        onClose();
        navigate('/');
      })
      .catch((error) => {
        setError({ message: error.response.data.error })
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  if (err) {
    const ERRORTIMEOUT = 3000;
    const timerId = setTimeout(() => {
      setError(null);
      clearTimeout(timerId);
    }, ERRORTIMEOUT);
  }


  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <CloseButton onClick={onClose}><MdClose />
            </CloseButton>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <ToggleButtonContainer>
                <ToggleButton active={isSignIn ? 'true' : 'false'} onClick={() => setIsSignIn(true)}>
                  Sign In
                </ToggleButton>
                <ToggleButton active={isSignIn ? 'false' : 'true'} onClick={() => setIsSignIn(false)}>
                  Sign Up
                </ToggleButton>
              </ToggleButtonContainer>
            </div>
            <FillContainer>
              {isSignIn ? (
                <>
                  {/* Sign In Fields */}
                  <Label htmlFor="username">USERNAME:</Label>
                  <InputField
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Label htmlFor="password">PASSWORD:</Label>
                  <InputField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <SubmitButtonContainer>
                    <SubmitButton onClick={handleSignIn}>{isLoading ? 'Signing in...' : 'SIGN IN'}</SubmitButton>
                  </SubmitButtonContainer>
                </>
              ) : (
                <>
                  {/* Sign Up Fields */}
                  <Label htmlFor="username">USERNAME:</Label>
                  <InputField
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Label htmlFor="password">PASSWORD:</Label>
                  <InputField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Label htmlFor="email">EMAIL:</Label>
                  <InputField
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <SubmitButtonContainer>
                    <SubmitButton onClick={handleSignUp}>{isLoading ? 'Creating account...' : 'SIGN UP'}</SubmitButton>
                  </SubmitButtonContainer>
                </>
              )}
              {err && <ErrorHandler message={err.message} />}
            </FillContainer>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default SignInSignUpModal;
