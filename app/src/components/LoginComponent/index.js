import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { minWidthMediaQuery } from "../../constants/responsive";
import styled from "styled-components";
import { styles } from "./styles";
import {
  Checkbox,
  Button,
  Header,
  Input,
  Modal
} from "semantic-ui-react/dist/commonjs";
import { LoginMutation } from "../../graphql/mutations/login_mutation";
import graphql from "../../hoc/graphql";
import { AUTH_TOKEN_NAME } from "../../consts";
import { colors } from "../../constants/colors";
import { layout } from '../../constants/layout';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
	padding: 10px;
	background-color: lightgray;

  & > div {
    padding-bottom: 16px;
  }

  ${minWidthMediaQuery.laptopL`
    flex-direction: row;
    font-size: 250% !important;
  `}
`;

const LoginMenu = styled.div`
  width: 300px;
  height: 350px;
  display: flex;
  box-shadow: 0 10px 6px -6px rgba(0,0,0,0.40);

  ${minWidthMediaQuery.mobileM`width: 350px;`}
  ${minWidthMediaQuery.mobileL`width: 420px;`}
  ${minWidthMediaQuery.phablet`width: 500px;`}
  ${minWidthMediaQuery.tablet`width: 550px;`}
  ${minWidthMediaQuery.laptop`width: 600px;`}
  ${minWidthMediaQuery.laptopL`width: 700px;`}
  ${minWidthMediaQuery.desktop`width: 1250px;`}

  @media (max-height: 420px) and (orientation: landscape) {
    height: 320px;
  }
`;

LoginMenu.TextHeader = styled.h2`
  height: 20%;
  margin: 0;
  font-family: ${layout.fontFamily};
  font-weight: 300;
  display: flex;
	align-items: center;
`;

LoginMenu.LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
	height: auto;
	border: 10px solid black;
	padding: 20px;
	background-color: ${colors.darkGray};
	color: white;
	box-shadow: 0 10px 6px -6px rgba(0,0,0,0.40);
`;

const { LoginForm } = LoginMenu;

LoginForm.InputContainer = styled.div`
  margin: 16px 0px;

  div:nth-of-type(1) {
    margin-bottom: 16px;
  }
`;

LoginForm.Input = styled(Input)`
  border-radius: 3 !important;
	border: 1px solid ${colors.lightGray};
  width: 80%;
  font-family: ${layout.fontFamily};

  input {
    background-color: ${colors.darkGray} !important;
	color: ${colors.lightGray} !important;
	font-family: ${layout.fontFamily} !important;
  }
`;

LoginForm.LoginButton = styled(Button)`
  font-family: ${layout.fontFamily};
  border-color: ${colors.darkGray};
  color: ${colors.darkGray};
  padding: 0.5em 2em;
`;

@graphql(LoginMutation, {
  name: "login"
})
@withRouter
class Login extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
		username: "",
		password: "",
		rememberMe: false,
		loading: false,
		error: null
		};
	}
	render() {
		const { loading, error } = this.state;
		return (
		<LoginContainer>
			<LoginMenu.LoginForm>
				<LoginMenu.TextHeader>
				Log into your Earth Guardians Account
				</LoginMenu.TextHeader>
				<LoginForm.InputContainer>
					<LoginForm.Input
					type="username"
					name="username"
					placeholder="username"
					value={this.state.username}
					onChange={this.handleInputChange}
					/>
					<LoginForm.Input
					type="password"
					name="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.handleInputChange}
					/>
				</LoginForm.InputContainer>
				<LoginForm.LoginButton loading={loading} onClick={this.handleLogin}>
					Log In
				</LoginForm.LoginButton>

				<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<Checkbox
						type="checkbox"
						id="rememberMe"
						checked={this.state.rememberMe}
						onChange={this.toggleRememberMe}
						style={{ paddingTop: "7px", paddingBottom: "20px", fontFamily: layout.fontFamily }}
					/>
					<label style={{color: 'white', fontSize: '14px', fontFamily: 'inherit', marginLeft: '5px'}}>Remember Me</label>
				</div>
				<a style={styles.linkText}>Forgot your password?</a>
				<a style={styles.linkText}>Need to create an account?</a>
			</LoginMenu.LoginForm>
		</LoginContainer>
		);
	}

	//Saves the username and password input to the component's state.
	handleInputChange = event => {
		if (event.target.name === 'username') {
		  this.setState({
			username: event.target.value
		  });
		} else {
		  this.setState({
			password: event.target.value
		  });
		}
	  };
	
	  //Saves rememberMe input to the component's state.
	  toggleRememberMe = () => {
		this.setState({
		  rememberMe: !this.state.rememberMe
		});
	  };
	
	  handleLogin = () => {
		const { history, login } = this.props;
		const { loading } = this.state;
		this.setState({ loading: !loading });
		const variables = {
		  username: this.state.username,
		  password: this.state.password
		};
		login({ variables })
		  .then(res => {
				console.log('res', res);
			if (res.data.login.token) {
			  let token = res.data.login.token;
			  localStorage.setItem(AUTH_TOKEN_NAME, token);
			  history.push('/home');
			  // console.error('there was an error inside then and token');
			} else {
			  console.error('there was an error inside .then');
			  this.setState({ loading: !false });
			}
		  })
		  .catch(err => {
			console.error('there was an error inside error', JSON.stringify(err));
			let errmsg =
			  err.graphQLErrors.length > 0
				? err.graphQLErrors[0].message
				: 'There was a network error, please try again!';
			this.setState({ loading: false, error: errmsg });
		  });
	  };
}

export default Login;
