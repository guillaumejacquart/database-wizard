import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { setScalability } from '../actions';

class ScalabilityForm extends Component {

    onSiteChanged(val) {
        this.props.onSelectScalability(val)
    }

    renderScalability(scalability) {
        return (<div key={scalability.name}>
            <input 
                type="radio" 
                name="scalability" 
                value={scalability.name}
                onChange={(e) => this.onSiteChanged(e.currentTarget.value)}/> {scalability.name}
        </div>);
    }

    renderScalabilitys() {
        const { data } = this.props;
        const scalabilityValues = data && data.scalabilityValues;

        if (scalabilityValues) {
            return scalabilityValues.enumValues.map((e) => this.renderScalability(e));
        }
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <div>
                    {this.renderScalabilitys()}
                </div>
            </div>
        )
    }

}

// We use the gql tag to parse our query string into a query document
const CurrentUserForLayout = gql `
  query{
      scalabilityValues: __type(name: "Scalability") {
        name
        enumValues {
          name
        }
      }
    }
`;

const mapDispatchToProps = dispatch => {
    return {
        onSelectScalability: scalability => {
            dispatch(setScalability(scalability))
        }
    }
}

const ScalabilityFormWithData = connect(null, mapDispatchToProps)(
    graphql(CurrentUserForLayout)(ScalabilityForm)
);

export default ScalabilityFormWithData
