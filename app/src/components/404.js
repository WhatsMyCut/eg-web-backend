import React from 'react';

import { Header, Container } from 'semantic-ui-react';

const PageNotFound = () => {
  return (
    <Container textAlign="center" style={{ paddingTop: '25%' }}>
      <Header as="h1">Page Not Found</Header>
      <Header as="h2">404</Header>
    </Container>
  );
};

export default PageNotFound;
