import React, { useState } from 'react';
import AuthForm from './components/auth/AuthForm';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  return (
    <div>
 
    </div>
  );
}

export default App;