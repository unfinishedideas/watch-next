import React from 'react';
import { useApiHealth } from '../context/APIHealthContext';

const HealthBanner: React.FC = () => {
  const { status, checkHealth } = useApiHealth();

  if (status === 'checking') {
    return <div style={{ backgroundColor: 'lightgray' }}>Checking API health...</div>;
  }

  if (status === 'unhealthy') {
    return (
      //<div style={{ backgroundColor: 'red', color: 'white', padding: '1em' }}>
      <div className="bg-error">
        <p>⚠️ API is down. Some features may not work.</p>
        <button onClick={checkHealth}>Retry</button>
      </div>
    );
  }

  return null; // Don't show anything if healthy
};

export default HealthBanner;