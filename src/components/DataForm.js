import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { 
    setStructure, 
    setSchemabased,
    setVolume,
    setEvolutivity,
    setScalability,
    setDatatype
} from '../actions';

class DataForm extends Component {

    constructor(){
        super();
        this.schemaBasedValues = [{
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
                <h1>Data specs</h1>
                <div>
                    <h2>Data structure</h2>
                    <div>{this.renderRadios("structuresValues", "structure", "onSelectStructure")}</div>
                </div>
                <div>
                    <h2>Schema based</h2>
                    <div>{this.renderRadiosValues(this.schemaBasedValues, "schemaBased", "onSelectSchemabased")}</div>
                </div>
                <div>
                    <h2>Data volume</h2>
                    <div>{this.renderRadios("volumesValues", "volume", "onSelectVolume")}</div>
                </div>
                <div>
                    <h2>Data evolutivity</h2>
                    <div>{this.renderRadios("evolutivitiesValues", "evolutivity", "onSelectEvolutivity")}</div>
                </div>
                <div>
                    <h2>Data scalability</h2>
                    <div>{this.renderRadios("scalabilitiesValues", "scalability", "onSelectScalability")}</div>
                </div>
                <div>
                    <h2>Data type</h2>
                    <div>{this.renderRadios("dataTypesValues", "dataType", "onSelectDatatype")}</div>
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

      volumesValues: __type(name: "Volume") {
        name
        enumValues {
          name
        }
      }

      scalabilitiesValues: __type(name: "Scalability") {
        name
        enumValues {
          name
        }
      }
    
      evolutivitiesValues: __type(name: "Evolutivity") {
        name
        enumValues {
          name
        }
      }
    
      dataTypesValues: __type(name: "DataType") {
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
        },
        onSelectSchemabased: schemaBased => {
            dispatch(setSchemabased(schemaBased))  
        },
        onSelectVolume: volume => {
            dispatch(setVolume(volume))
        },
        onSelectEvolutivity: evolutivity => {
            dispatch(setEvolutivity(evolutivity))
        },
        onSelectScalability: scalability => {
            dispatch(setScalability(scalability))
        },
        onSelectDatatype: dataType => {
            dispatch(setDatatype(dataType))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        structure: state.wizard.structure,
        schemaBased: state.wizard.schemaBased,
        volume: state.wizard.volume,
        evolutivity: state.wizard.evolutivity,
        scalability: state.wizard.scalability,
        dataType: state.wizard.dataType
    };
}

const DataFormWithData = connect(mapStateToProps, mapDispatchToProps)(
    graphql(CurrentUserForLayout)(DataForm)
);

export default DataFormWithData
