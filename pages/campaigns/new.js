import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout'
import Factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorOccurred: false,
    errorMessage: '',
    loading: false
  };

  // Below not written as onSubmit as 
  // onSumbit() {  }
  // Because the value of 'this' does not get set corrected when used the method as an event handler
  // unless there is some sort of function binding done when we pass the event handler to the form tag
  // Thus, we define the event handler with syntax : 
  // onSUbmit = () => {  }
  onSubmit = async (event) => {
    // Handles form submittel
    // Form submittel on brower automatically tries to submit form to backend server
    // Thus, we need to prevent it
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
      errorOccurred: false
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await Factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

        Router.pushRoute('/');
    } catch (err) {
      this.setState({
        errorOccurred: true,
        errorMessage: err.message});
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form onSubmit={this.onSubmit} error={this.state.errorOccurred}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>

          <Message error header='Oops!!' content={this.state.errorMessage} />
          <Button loading={this.state.loading} type="Submit" primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;