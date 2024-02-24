import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components here
import Home from './admin'; // Assuming you have an admin.js file
import Form from './form'; // Assuming you have a separate component for the form

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app-container container">
                    <Routes>
                        <Route path="/admin" element={<Home />} />
                        <Route path="/" element={<Form />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
