import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaign from '../ethereum/campaign';
import { Router } from '../routes';

class CampaignForm extends Component {

  state = {
    contribution: '',
    errorMessage: '',
    errorOccurred: false,
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
      errorOccurred: false
    });

    const instance = campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, 'ether')
      });

      // This causes the same page to be reload, which causes the
      // getInitailProps function in show.js to execute again
      // and thus show the refreshed data for the campaigns
      Router.replaceRoute(`/campaigns/${this.props.address}`);

    } catch (err) {
      this.setState({
        errorMessage: err.message,
        errorOccurred: true
      });
    }

    this.setState({ loading: false, contribution: '' });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={this.state.errorOccurred}>
          <Form.Field>
            <label>Amount to contribute</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.contribution}
              onChange={event => 
                this.setState({ contribution: event.target.value })}
            />
          </Form.Field>
          <Message error header="Opps!!" content={this.state.errorMessage} />
          <Button primary type="sumbit" loading={this.state.loading}>
            Contribute
          </Button>
        </Form>
    );
  }
}

export default CampaignForm;
