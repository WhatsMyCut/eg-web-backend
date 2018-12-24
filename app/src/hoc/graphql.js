import { getMainDefinition } from 'apollo-utilities';
import React from 'react';
import { graphql } from 'react-apollo';
import { Button, Icon, Message } from 'semantic-ui-react';

const refetches = [];

export default function(document, operationOptions = {}) {
  const { kind, operation } = getMainDefinition(document);

  if (kind !== 'OperationDefinition' || operation !== 'query') {
    return graphql(document, operationOptions);
  }

  const name = operationOptions.name || 'data';

  return function componentWrapper(Component) {
    @graphql(document, operationOptions)
    class MyGraphQL extends React.Component {
      static displayName = `MyGraphQL(${Component.displayName ||
        Component.name})`;

      state = {
        fetching: false
      };

      componentWillMount() {
        this._addRefetch(this.props);
      }

      componentWillUpdate(nextProps) {
        this._removeRefetch(this.props);
        this._addRefetch(nextProps);
      }

      componentWillUnmount() {
        this._removeRefetch(this.props);
      }

      _addRefetch(props) {
        const data = props[name];

        if (!data) {
          return;
        }

        refetches.push(data.refetch);
      }

      _removeRefetch(props) {
        const data = props[name];

        if (!data) {
          return;
        }

        const index = refetches.indexOf(data.refetch);
        if (index >= 0) {
          refetches.splice(index, 1);
        }
      }

      render() {
        const data = this.props[name];

        if (data && data.error) {
          return this._renderError(data.error);
        }

        return <Component {...this.props} />;
      }

      _renderError(error) {
        const { fetching } = this.state;

        return (
          <div style={{ textAlign: 'center' }}>
            <Message negative compact>
              <p>{error.message}</p>
              <Button
                primary
                fluid
                loading={fetching}
                disabled={fetching}
                onClick={this._refetch}
              >
                <Icon name="refresh" size="large" />Retry
              </Button>
            </Message>
          </div>
        );
      }

      _refetch = () => {
        const start = new Date();
        this.setState({ fetching: true });
        Promise.all(refetches.map(refetch => refetch()))
          .then(() => {
            this.setState({ fetching: false });
          })
          .catch(() => {
            const end = new Date();
            const diff = end - start;
            window.setTimeout(() => {
              this.setState({ fetching: false });
            }, Math.max(0, 500 - diff));
          });
      };
    }

    return MyGraphQL;
  };
}
