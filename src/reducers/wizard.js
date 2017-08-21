import {
    SET_STRUCTURE,
    SET_SCALABILITY,
    SET_VOLUME,
    SET_EVOLUTIVITY,
    SET_SPEEDTYPE,
    SET_CONSISTENCY,
    SET_SQLCOMPLIANCY,
    SET_STANDARDCOMPLIANCY,
    SET_SCHEMABASED,
    SET_DATATYPE,
    SET_TRANSACTION
}
from '../actions/types';

const INITIAL_STATE = {
    structure: '',
    scalability: '',
    volume: '',
    evolutivity: '',
    speedTypes: '',
    consistency: '',
    compliancy: '',
    schemaBased: null
}

function setCheckbox(state, name, value) {
    var newState = { ...state };

    var data = newState[name];
    var index = data.indexOf(value)
    if (index === -1) {
        data.push(value);
    }
    else {
        data.splice(index, 1);
    }
    newState[name] = data;
    return newState;
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_STRUCTURE:
            return { ...state, structure: action.structure };
        case SET_SCALABILITY:
            return { ...state, scalability: action.scalability };
        case SET_VOLUME:
            return { ...state, volume: action.volume };
        case SET_EVOLUTIVITY:
            return { ...state, evolutivity: action.evolutivity };
        case SET_SPEEDTYPE:
            return { ...state, speedType: action.speedType };
        case SET_CONSISTENCY:
            return { ...state, consistency: action.consistency };
        case SET_SQLCOMPLIANCY:
            return { ...state, sqlCompliant: action.sqlCompliant };
        case SET_STANDARDCOMPLIANCY:
            return { ...state, standardCompliant: action.standardCompliant };
        case SET_TRANSACTION:
            return { ...state, transaction: action.transaction };
        case SET_SCHEMABASED:
            return { ...state, schemaBased: action.schemaBased };
        case SET_DATATYPE:
            return { ...state, dataType: action.dataType };
        default:
            return state;
    }
}
