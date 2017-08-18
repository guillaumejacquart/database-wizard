import {
    SET_STRUCTURE,
    SET_SCALABILITY,
    SET_VOLUME
} from '../actions/types';

const INITIAL_STATE = {
    structure: '',
    scalability: '',
    volume: 0
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_STRUCTURE:
            return {...state, structure: action.structure};
        case SET_SCALABILITY:
            return {...state, scalability: action.scalability};
        case SET_VOLUME:
            return {...state, volume: action.volume};
        default: 
            return state;
    }
}
