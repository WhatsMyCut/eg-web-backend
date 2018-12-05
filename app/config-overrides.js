const {
    override,
    addDecoratorsLegacy,
    useEslintRc
  } = require('customize-cra');


  const gqltag = require('react-app-rewire-graphql-tag');
  
  const customizeCra = override(
    addDecoratorsLegacy(),
    useEslintRc(),
    gqltag
  );
  
  console.log(customizeCra);
  
  module.exports = customizeCra;