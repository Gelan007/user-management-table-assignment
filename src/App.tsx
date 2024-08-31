import React from 'react';
import UsersTable from "./components/table/UsersTable";



function App() {
  return (
    <div className="app">
        <h1 className="app__title">
            User Management Table
        </h1>
      <UsersTable/>
    </div>
  );
}

export default App;
