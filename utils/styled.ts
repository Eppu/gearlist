import styled from 'styled-components';

export const StyledTitle = styled.h1`
  display: 'inline',
  fontFamily: 'Manrope',
  fontWeight: 'bold',
  color: '$text',
  lh: '1.2',
  fs: '2.5rem',
  '@sm': {
    fs: '3rem',
  },
  '@lg': {
    fs: '3.5rem',
`;

export const StyledGradientTitle = styled(StyledTitle)`
  display: 'inline-block',
  marginTop: '2rem',
  textGradient: '180deg, #FF1CF7 25%, #b249f8 100%',
  '&::selection': {
    WebkitTextFillColor: '$colors$text',
  },
  // This is to line text up properly on high-res wide displays
  paddingRight: '0.5rem',
`;

export const StyledSubtitle = styled.p`
  pl: '$1',
  fs: '$xl',
  fontFamily: 'Manrope',
  width: '100%',
  display: 'inline-flex',
  fontWeight: '$medium',
  color: '$accents7',
`;
