import styled from 'styled-components';

const commonHeadingStyles = `
	font-weight: bold;
	margin-bottom: 1rem;
	line-height: 150%;
`;

const H1 = styled.h1`
	${commonHeadingStyles}
	font-size: 3rem;
`;

const H2 = styled.h1`
	${commonHeadingStyles}
	font-size: 2.4rem;
`;

const H3 = styled.h1`
	${commonHeadingStyles}
	font-size: 2rem;
`;

const H4 = styled.h1`
	${commonHeadingStyles}
	font-size: 1.8rem;
`;

const P = styled.p``;

const label = styled.label``;

export {
	H1,
	H2,
	H3,
	H4,
	P,
	label
}