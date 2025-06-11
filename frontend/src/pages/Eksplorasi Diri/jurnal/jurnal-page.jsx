// jurnal-page.jsx
import React, { useState, useEffect } from 'react';
import JurnalView from '../jurnal/jurnal-view';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function JurnalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) {
        window.location.href = '/login';
      }
    });
    return unsubscribe;
  }, []);

  return <JurnalView isAuthenticated={isAuthenticated} />;
}
