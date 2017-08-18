import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { setStructure } from '../actions';

class StructureForm extends Component {

    onSiteChanged(val) {
        this.props.onSelectStructure(val)
    }

    renderStructure(structure) {
        return (<div key={structure.name}>
            <input 
                type="radio" 
                name="structure" 
                value={structure.name}
                onChange={(e) => this.onSiteChanged(e.currentTarget.value)}/> {structure.name}
        </div>);
    }

    renderStructures() {
        const { data } = this.props;
        const structuresValues = data && data.structuresValues;

        if (structuresValues) {
            return structuresValues.enumValues.map((e) => this.renderStructure(e));
        }
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <div>
                    {this.renderStructures()}
                </div>
            </div>
        )
    }

}

// We use the gql tag to parse our query string into a query document
const CurrentUserForLayout = gql `
  query{
      structuresValues: __type(name: "SchemaType") {
        name
        enumValues {
          name
        }
      }
    }
`;

const mapDispatchToProps = dispatch => {
    return {
        onSelectStructure: structure => {
            dispatch(setStructure(structure))
        }
    }
}

const StructureFormWithData = connect(null, mapDispatchToProps)(
    graphql(CurrentUserForLayout)(StructureForm)
);

export default StructureFormWithData
