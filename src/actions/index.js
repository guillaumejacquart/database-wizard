import {
    SET_STRUCTURE,
    SET_SCALABILITY,
    SET_VOLUME,
    SET_EVOLUTIVITY,
    SET_SPEEDTYPE,
    SET_SQLCOMPLIANCY,
    SET_STANDARDCOMPLIANCY,
    SET_CONSISTENCY,
    SET_SCHEMABASED,
    SET_DATATYPE,
    SET_TRANSACTION
} from './types';

function setStructure(structure) {
  return {
    type: SET_STRUCTURE,
    structure
  }
}

function setScalability(scalability) {
  return {
    type: SET_SCALABILITY,
    scalability
  }
}

function setVolume(volume) {
  return {
    type: SET_VOLUME,
    volume
  }
}

function setEvolutivity(evolutivity) {
  return {
    type: SET_EVOLUTIVITY,
    evolutivity
  }
}

function setSpeedtype(speedType) {
  return {
    type: SET_SPEEDTYPE,
    speedType
  }
}

function setSqlCompliancy(sqlCompliant) {
  return {
    type: SET_SQLCOMPLIANCY,
    sqlCompliant
  }
}

function setStandardCompliancy(standardCompliant) {
  return {
    type: SET_STANDARDCOMPLIANCY,
    standardCompliant
  }
}

function setConsistency(consistency) {
  return {
    type: SET_CONSISTENCY,
    consistency
  }
}

function setSchemabased(schemaBased) {
  return {
    type: SET_SCHEMABASED,
    schemaBased
  }
}

function setDatatype(dataType) {
  return {
    type: SET_DATATYPE,
    dataType
  }
}

function setTransaction(transaction) {
  return {
    type: SET_TRANSACTION,
    transaction
  }
}

export {
    setStructure,
    setScalability,
    setVolume,
    setEvolutivity,
    setSpeedtype,
    setConsistency,
    setSqlCompliancy,
    setStandardCompliancy,
    setSchemabased,
    setDatatype,
    setTransaction
};