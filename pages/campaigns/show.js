import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import campaign from '../../ethereum/campaign';
import CampaignForm from '../../components/CampaignForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const campaignInstance = campaign(props.query.address);
    const campaignSummary = await campaignInstance.methods.getSummary().call()

    return {
      minimumContribution: campaignSummary[0],
      balance: campaignSummary[1],
      requestsCount: campaignSummary[2],
      approversCount: campaignSummary[3],
      manager: campaignSummary[4],
      address: props.query.address
    }
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Manager Address',
        description: 'Creator of this campaign and create requests to withdram money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'Mininum Contribution to become an approver',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance (ether)',
        description: 'Balance left for campaign to spend',
        style: { overflowWrap: 'break-word' }
      },
    ]

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <CampaignForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;