import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';

class RequestIndexPage extends Component {

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  render() {
    console.log(this.props.address);
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Requests</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndexPage;