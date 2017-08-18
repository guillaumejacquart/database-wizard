import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class ValidateWizard extends Component { 
    render(){
        console.log(this.props);
        return (
            <div>Test</div>
        )
    }
    
}

// We use the gql tag to parse our query string into a query document
const CreateRequest = gql`
  mutation{
    createRequest(
      volume: 100
      scalability: Distributed,
      structure: WideColumn
      userId: "cj6hu0a7n0asm0158i82gk4ad"
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

const ValidateWizardWithMutation = graphql(CreateRequest)(ValidateWizard);

export default ValidateWizardWithMutation;