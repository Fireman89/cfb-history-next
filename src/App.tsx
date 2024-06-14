import React from 'react';
import './App.css';
import SchedulePage from './page/SchedulePage';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import NotFoundPage from './page/NotFoundPage';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>
            <main className="App-body">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate to="year/2022"/>
                            }
                        />
                        <Route
                            path="year/:year"
                            element={
                                <SchedulePage/>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <NotFoundPage/>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer className="App-footer">
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
