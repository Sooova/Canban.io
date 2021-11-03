import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { color, shape } from '../styles';
import canbanio from '../assets/images/canbanio.png';
import styled from 'styled-components';
import { Navigation } from "@mui/icons-material";

const Header = styled.header`
	// padding: 20px;
`;

const StyledNav = styled.nav`
	display: flex;
	background-color: ;
`;

const NavigationList = styled.ul`
	display: flex;
	vertical-align: top;
	width: 100%;
	${props => props.float && `
		justify-content: end;
	`}
`;

const NavigationItem = styled.li`
	margin: 1rem;
	padding: 1rem;
	border-radius: ${shape.borderRadius};

	a {
		color: ${color.textDark};
		text-decoration: none;
		font-size: 1.6rem;
	}

	&:hover {
		background: ${color.backgroundLight};
	}
`;

const StyledCanbanio = styled.img`
	width:250px;
	display:block;
`;

function AuthNav() {
	if (Auth.loggedIn()) {
		return (
			<NavigationList float="right">
				<NavigationItem>
					{/* this is not using the Link component to logout or user and then refresh the application to the start */}
					<a href="/" onClick={() => Auth.logout()}>
						Logout
					</a>
				</NavigationItem>
				{window.location.pathname == "/" ? 
				<NavigationItem>
					Dashboard
				</NavigationItem>:""}
			</NavigationList>
		);
	} else {
		return (
			<NavigationList float="right">
				<NavigationItem>
					<Link to="/signup">
						Signup
					</Link>
				</NavigationItem>
				<NavigationItem>
					<Link to="/login">
						Login
					</Link>
				</NavigationItem>
			</NavigationList>
		);
	}
}

//Improve pathname handling for logo

function Nav() {
	return (
		<Header>
			<StyledNav>
				<NavigationList>
					<NavigationItem>
						{window.location.pathname == "/" ? 
						<Link to="/">
							<StyledCanbanio src={canbanio} />
						</Link>: "" }
						{window.location.pathname == "/signup" ? 
						<Link to="/">
							<StyledCanbanio src={canbanio} />
						</Link>: "" }
						{window.location.pathname == "/login" ? 
						<Link to="/">
							<StyledCanbanio src={canbanio} />
						</Link>: "" }
					</NavigationItem>
					<NavigationItem>

					</NavigationItem>
				</NavigationList>
				<AuthNav />

			</StyledNav>
		</Header>
	);
}

export default Nav;
