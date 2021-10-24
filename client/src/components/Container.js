import styled from 'styled-components';
import { color, shape } from '../styles';

const StyledContainer = styled.div`
	padding: 2rem;
	background: ${color.backgroundLight};
	border-top: 1px solid;
	font-size: 1.4rem;

	${props => `
		text-align: ${props.alignContent};
	`}
`;

const Container = props => <StyledContainer {...props} />

export {
	Container
}