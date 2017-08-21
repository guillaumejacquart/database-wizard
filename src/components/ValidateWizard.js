import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose } from 'react-apollo';

class ValidateWizard extends Component {
  
  constructor(){
    super();
    
    this.state = {
      databases: []
    }
  }
  
  renderDatabase(d){
    return (
      <div>{d.name}</div>
    )
  }
  
  onValidate() {
    var variables = Object.assign({}, this.props);
    variables.schemaBased = Boolean(variables.schemaBased);
    variables.standardCompliant = Boolean(variables.standardCompliant);
    variables.transaction = Boolean(variables.transaction);
    
    this.props.mutate({
        variables
      })
      .then(({ data }) => {
        this.setState({databases: data.createRequest.matchingDatabases})
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  
  render() {
    return (
      <div>
        {!this.state.databases.length &&
        <button className="btn btn-success" onClick={this.onValidate.bind(this)}>Validate</button>
        }
        
        {this.state.databases.map((d) => this.renderDatabase(d))}
      </div>
    )
  }

}

// We use the gql tag to parse our query string into a query document
const CreateRequest = gql `
  mutation createRequestFromState(
      $structure: SchemaType
      $scalability: Scalability
      $volume: Volume
      $transaction: Boolean
      $consistency: Consistency
      $speedType: SpeedType
      $evolutivity: Evolutivity
      $standardCompliant: Boolean
      $sqlCompliant: SQLCompliancy
      $schemaBased: Boolean
      $dataType: DataType
    ){
    createRequest(
      structure: $structure
      scalability: $scalability
      volume: $volume
      transaction: $transaction
      consistency: $consistency
      speedType: $speedType
      evolutivity: $evolutivity
      standardCompliant: $standardCompliant
      sqlCompliant: $sqlCompliant
      schemaBased: $schemaBased
      dataType: $dataType
    ){
      id
      user{
        email
      }
      matchingDatabases{
        name
      }
    }
  }
`;

const getUser = gql `
  query {
    user {
      id
    }
  }
`;


const mapStateToProps = (state) => {
  return Object.assign({}, state.wizard);
}

const ValidateWizardWithMutation = compose(graphql(CreateRequest), graphql(getUser))(ValidateWizard);

export default connect(mapStateToProps)(ValidateWizardWithMutation);
