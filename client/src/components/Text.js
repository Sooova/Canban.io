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

const StyledText = styled.h1`
    font-family: "DM Sans", sans-serif;
    font-size: ${props => props.fontSize};
    color: rgb(31, 28, 46);
    font-weight: ${props => props.fontWeight};
    opacity: ${props => props.opacity};
    margin-bottom:2%;
`;

export {
	H1,
	H2,
	H3,
	H4,
	P,
	label, 
	StyledText
}