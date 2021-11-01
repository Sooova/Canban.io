import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations';
import Auth from '../utils/auth';
import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import canbanwithmac from '../assets/images/canban with mac.png';

const StyledSignupHeader = styled.h1`
    font-family: "DM Sans", sans-serif;
    font-size: 45px;
    color: rgb(31, 28, 46);
    font-weight: 700;
    opacity: 0.9;
    margin-bottom: 10px;
    @media (max-width: 921px) {
      font-size:65px
    }
    @media (max-width: 745px) {
      font-size:55px
    }
`;

const StyledSignupBreadcrumb = styled.p`
font-family: "DM Sans", sans-serif;
font-size:12px;
color: rgb(31, 28, 46);
opacity:0.7;
`;

const StyledSignupP = styled.p`
font-family: "DM Sans", sans-serif;
font-size:15px;
color: rgb(31, 28, 46);
font-weight: 600;
opacity:0.7;
padding-top:40px;
`;

const StyledInput = styled.input`
width:100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: #FFC3C3;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 12px;
  outline: 0;
  border: 1px solid #FFC3C3;
  cursor: pointer;
  color: rgb(31, 28, 46);
  width:120px;
  display:block;
  margin-top: 20px;
`;

const StyledImg = styled.img`
width: 35%;
margin-right: 3%;
@media (max-width: 930px) {
  display:none;
}
`;

function Login(props) {
  document.body.style = "background-image: none; background-color: #FCF6F6 ";
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div style = {{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
        alignContent: "center",
        marginTop: "6%",
      }}>

        <StyledImg src = {canbanwithmac}/>

      <div style={{
        display: "flex",
        justifyContent: "left",
        padding: "20px",
        flexDirection: "column",
        width:"35%",
        backgroundColor: "white",
        borderRadius: "30px",
        justifyContent: "center",
      }}>
        <div>
          <StyledSignupHeader>
            Login to your account
          </StyledSignupHeader>
          <StyledSignupBreadcrumb>
            Already signed up?<span>
              <Link to="/signup"> Click here to signup!</Link></span>
          </StyledSignupBreadcrumb>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <StyledSignupP>
              Email
            </StyledSignupP>
            <StyledInput
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <StyledSignupP>
              Password
            </StyledSignupP>
            <StyledInput
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div style={{
            display: "flex",
            justifyContent: "right"
          }}>
            <StyledButton type={"submit"}>
              Sign In
            </StyledButton>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default Login;
