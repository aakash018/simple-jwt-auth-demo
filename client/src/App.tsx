import axios from 'axios';
import React from 'react';
import './App.css';

function App() {

  const name: string = "Joe"

  const handleClick = async () => {
    const fetched = await axios.get("/get")
    console.log(fetched.data)
  }

  return (
    <div className="App">
      <header className="App-header">
          Hello {name}
          <button onClick={handleClick}>Click</button>
      </header>
    </div>
  );
}

export default App;
