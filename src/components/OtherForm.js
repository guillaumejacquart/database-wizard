import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { 
    setSqlCompliancy, 
    setStandardCompliancy
} from '../actions';

class OtherForm extends Component {

    constructor(){
        super();
        this.standardCompliancies = [{
            name: 'true',
        }, {
            name: 'false'
        }]
    }
    
    renderRadio(name, propName, e, changed) {
        return (
            <div className="radio-wrapper" key={e.name}>
                <label key={e.name}>
                    <input 
                        type="radio" 
                        name={name}
                        value={e.name}
                        checked={e.name === this.props[propName]}
                        onChange={(e) => changed(e.currentTarget.value)}/> { e.name }
                </label>
            </div>
        );
    }
    
    onValueChanged(name){
        var func = this.props && this.props[name]
        func = func.bind(this)
        
        return func;
    }
    
    renderRadios(valuesName, propName, callbackName){
        const { data } = this.props;
        var dataValues = data && data[valuesName];
        if (dataValues) {
            return dataValues.enumValues.map((e) => {
                return this.renderRadio(valuesName, propName, e, this.onValueChanged(callbackName));
            });
        }
    }
    
    renderRadiosValues(dataValues, propName, callbackName){
        if (dataValues) {
            return dataValues.map((e) => {
                return this.renderRadio(propName, propName, e, this.onValueChanged(callbackName));
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Other requirements</h1>
                <div>
                    <h2>SQL Compliancy</h2>
                    <div>{this.renderRadios("sqlComplianciesValues", "sqlCompliant", "onSelectSqlCompliancy")}</div>
                </div>
                <div>
                    <h2>Standard compliancy</h2>
                    <div>{this.renderRadiosValues(this.standardCompliancies, "standardCompliant", "onSelectStandardCompliancy")}</div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSelectSqlCompliancy: sqlCompliancy => {
            dispatch(setSqlCompliancy(sqlCompliancy))
        },
        onSelectStandardCompliancy: standardCompliancy => {
            dispatch(setStandardCompliancy(standardCompliancy))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        sqlCompliant: state.wizard.sqlCompliant,
        standardCompliant: state.wizard.standardCompliant
    };
}

// We use the gql tag to parse our query string into a query document
const CurrentUserForLayout = gql `
  query{
      sqlComplianciesValues: __type(name: "SQLCompliancy") {
        name
        enumValues {
          name
        }
      }
    }
`;

const OtherFormWithData = connect(mapStateToProps, mapDispatchToProps)(
    graphql(CurrentUserForLayout)(OtherForm)
);

export default OtherFormWithData
