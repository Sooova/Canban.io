import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, shape } from '../styles';

const BreakcrumbWrapper = styled.div`
	padding: 10px 20px;
	background: ${color.backgroundMedium};

	a {
		color: ${color.textDark};
		text-decoration: none;
		font-size: 1.4rem;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const Breadcrumb = ({
	location,
	text
}) => {
	return (
		<BreakcrumbWrapper>
			<Link to={location}>{text}</Link>
		</BreakcrumbWrapper>
	)
}

export {
	Breadcrumb
}