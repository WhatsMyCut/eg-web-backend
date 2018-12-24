import { css } from 'styled-components';

// Breakpoint Config
export const responsiveSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  phablet: '600px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const _mediaQueryGenerator = (sizes, type) => {
  return Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (${type}: ${sizes[label]}) {
        ${css(...args)}
      }
    `;
    
    return acc;
  }, {});
};

// Media Template
export const minWidthMediaQuery = _mediaQueryGenerator(responsiveSizes, 'min-width');
export const maxWidthMediaQuery = _mediaQueryGenerator(responsiveSizes, 'max-width');
