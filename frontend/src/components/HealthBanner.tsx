import React from 'react';
import { useApiHealth } from '../context/APIHealthContext';

const HealthBanner: React.FC = () => {
  const { status, checkHealth } = useApiHealth();

  // if (status === 'checking') {
  //   return <div style={{ backgroundColor: 'lightgray' }}>Checking API health...</div>;
  // }

  if (status === 'unhealthy') {
    return (
      <div className="bg-error flex flex-row items-center">
        <p>⚠️ API is down. Some features may not work.</p>
        {/* TODO: Do we actually want this button? */}
        <button className="btn py-1 ml-2 my-2" onClick={checkHealth}>Retry</button>
      </div>
    );
  }

  return null; // Don't show anything if healthy
};

export default HealthBanner;