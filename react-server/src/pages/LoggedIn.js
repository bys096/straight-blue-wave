import React from 'react';
import Header from '../components/views/Header';
import Sidebar from '../components/views/Sidebar';
import MainPage from './MainPage';
import Footer from '../components/views/Footer';

import './LoggedIn.css';
function LoggedIn(props) {
    return (
        <div className='main'>
            <Header />
            <div className='article'>
                <Sidebar />
                <MainPage />
            </div>
            <Footer />
        </div>
    );
}

export default LoggedIn;