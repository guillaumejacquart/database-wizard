import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

import { 
  StructureForm,
  VolumeForm,
  ValidateWizard, 
  Summary, 
  ScalabilityForm 
} from './components'

import logo from './logo.svg';
import './App.css';
import './style/main.css';

const steps = [
  { name: 'Structure', component: <StructureForm /> },
  { name: 'Scalability', component: <ScalabilityForm /> },
  { name: 'Volume', component: <VolumeForm /> },
  { name: 'Validate', component: <ValidateWizard /> },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Summary/>
        <div className='step-progress'>
          <StepZilla steps={steps}/>
        </div>
      </div>
    );
  }
}

export default App;
