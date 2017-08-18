import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {

    render() {
        const { wizard } = this.props;
        return (
            <div className='summary'>
                {wizard &&
                <div>
                    <div>{wizard.structure}</div>
                    <div>{wizard.scalability}</div>
                    <div>{wizard.volume || ''}</div>
                </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        wizard: state.wizard
    }
}

const SummaryWithData = connect(mapStateToProps)(Summary);
export default SummaryWithData;
