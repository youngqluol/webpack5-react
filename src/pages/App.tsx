// import React from 'react'; // React is required, unless you used jsx Runtime: react/jsx-runtime
import logo from '../assets/logo.svg';
import './App.css';
// import HelloWorld from '../components/HelloWorld';
// import HeaderBar from '../components/HeaderBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <HelloWorld text={'hello world'}></HelloWorld>
      <HeaderBar text={'hello world'}></HeaderBar> */}
    </div>
  );
}

export default App;
