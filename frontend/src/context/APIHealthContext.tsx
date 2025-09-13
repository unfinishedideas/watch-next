import React, { createContext, useContext, useEffect, useState } from 'react';
import { base_url } from '../api/CommonAPI';

type ApiHealthStatus = 'healthy' | 'unhealthy' | 'checking';

interface ApiHealthContextType {
  status: ApiHealthStatus;
  checkHealth: () => Promise<void>;
}

const ApiHealthContext = createContext<ApiHealthContextType | undefined>(undefined);

export const ApiHealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ApiHealthStatus>('checking');

  const checkHealth = async () => {
    setStatus('checking');
    try {
      const res = await fetch(`${base_url}/health`);
      if (res.ok) {
        setStatus('healthy');
      } else {
        setStatus('unhealthy');
      }
    } catch (error) {
      setStatus('unhealthy');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <ApiHealthContext.Provider value={{ status, checkHealth }}>
      {children}
    </ApiHealthContext.Provider>
  );
};

export const useApiHealth = () => {
  const context = useContext(ApiHealthContext);
  if (!context) {
    throw new Error('useApiHealth must be used within an ApiHealthProvider');
  }
  return context;
};
