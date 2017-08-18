import {
    SET_STRUCTURE,
    SET_SCALABILITY,
    SET_VOLUME
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

export {
    setStructure,
    setScalability,
    setVolume
};