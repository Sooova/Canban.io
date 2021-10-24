import styled from 'styled-components';
import { color, shape } from '../styles';

const Button = styled.button`
	margin-top: 2rem;
	background: ${color.primary};
	border: 0px;
	padding: 1rem;
	color: ${color.text};
	border-radius: ${shape.borderRadius};
	letter-spacing: 0.1rem;

	&:hover {
		cursor: pointer;
	}
`;

export {
	Button
}