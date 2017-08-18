import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setVolume } from '../actions';

class VolumeForm extends Component {

    onSiteChanged(val) {
        this.props.onSelectVolume(val)
    }

    renderVolume(volume) {
        return (<div key={volume.name}>
            <input 
                type="radio" 
                name="volume" 
                value={volume.name}
                onChange={(e) => this.onSiteChanged(e.currentTarget.value)}/> {volume.name}
        </div>);
    }

    renderVolumes() {
        const { data } = this.props;
        const volumeValues = data && data.volumeValues;

        if (volumeValues) {
            return volumeValues.enumValues.map((e) => this.renderVolume(e));
        }
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <div>
                    {this.renderVolumes()}
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSelectVolume: volume => {
            dispatch(setVolume(volume))
        }
    }
}

const VolumeFormWithData = connect(null, mapDispatchToProps)(VolumeForm);

export default VolumeFormWithData
