import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';

function App() {
    // Simple view switcher for demonstration without router complexity
    const [currentView, setCurrentView] = useState('dashboard');

    const navigateTo = (view) => {
        setCurrentView(view);
    };

    return (
        <div>
            {currentView === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
            {currentView === 'playground' && <Playground onNavigate={navigateTo} />}
        </div>
    );
}

export default App;
