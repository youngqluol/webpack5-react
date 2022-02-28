// import React from 'react'; // React is required, unless you used jsx Runtime: react/jsx-runtime
import './App.css';
import HelloWorld from '../components/HelloWorld';
import HeaderBar from '../components/HeaderBar';

function App() {
  return (
    <div className='App'>
      <HelloWorld text='hello world' />
      <HeaderBar text='header bar' />
    </div>
  );
}

export default App;
