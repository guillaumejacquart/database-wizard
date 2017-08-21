import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

import {
  DataForm,
  QueryForm,
  OtherForm,
  ValidateWizard,
  Summary
}
from './components'

import logo from './logo.svg';
import './App.css';
import './style/main.css';

const steps = [
  { name: 'Data', component: <DataForm /> },
  { name: 'Query', component: <QueryForm /> },
  { name: 'Other', component: <OtherForm /> },
  { name: 'Validate', component: <ValidateWizard /> },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Database wizard</h2>
        </div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
            
              <Summary/>
              <div className='step-progress'>
                <StepZilla steps={steps} nextButtonCls="btn btn-primary btn-lg float-right"/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
