import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { 
    setSpeedtype, 
    setSqlCompliancy,
    setConsistency,
    setTransaction
} from '../actions';

class QueryForm extends Component {

    constructor(){
        super();
        this.transactionsValues = [{
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
                <h1>Query specs</h1>
                <div>
                    <h2>Performance requirements</h2>
                    <div>{this.renderRadios("speedTypesValues", "speedType", "onSelectSpeedType")}</div>
                </div>
                <div>
                    <h2>SQL Compliancy</h2>
                    <div>{this.renderRadios("sqlComplianciesValues", "sqlCompliance", "onSelectSqlCompliancy")}</div>
                </div>
                <div>
                    <h2>Consistency requirements</h2>
                    <div>{this.renderRadios("consistenciesValues", "consistency", "onSelectConsistency")}</div>
                </div>
                <div>
                    <h2>Transaction availables</h2>
                    <div>{this.renderRadiosValues(this.transactionsValues, "transaction", "onSelectTransaction")}</div>
                </div>
            </div>
        )
    }

}

// We use the gql tag to parse our query string into a query document
const CurrentUserForLayout = gql `
  query{
      speedTypesValues: __type(name: "SpeedType") {
        name
        enumValues {
          name
        }
      }

      sqlComplianciesValues: __type(name: "SQLCompliancy") {
        name
        enumValues {
          name
        }
      }
    
      consistenciesValues: __type(name: "Consistency") {
        name
        enumValues {
          name
        }
      }
    }
`;

const mapDispatchToProps = dispatch => {
    return {
        onSelectSpeedType: speedType => {
            dispatch(setSpeedtype(speedType))
        },
        onSelectSqlCompliancy: compliancy => {
            dispatch(setSqlCompliancy(compliancy))
        },
        onSelectConsistency: consistency => {
            dispatch(setConsistency(consistency))
        },
        onSelectTransaction: transaction => {
            dispatch(setTransaction(transaction))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        speedType: state.wizard.speedType,
        sqlCompliance: state.wizard.sqlCompliancy,
        consistency: state.wizard.consistency,
        transaction: state.wizard.transaction
    };
}

const QueryFormWithData = connect(mapStateToProps, mapDispatchToProps)(
    graphql(CurrentUserForLayout)(QueryForm)
);

export default QueryFormWithData
