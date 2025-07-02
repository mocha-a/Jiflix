import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './papes/Home';
import Movie from './papes/Movie';
import Detail from './papes/Detail';
import Header from './component/Header';
import Footer from './component/Footer';

import './style.scss';


function App() {
    return (
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/movie' element={<Movie/>}/>
                    <Route path='/tv' element={<Movie/>}/>
                    <Route path='/movie/:type' element={<Movie/>}/>
                    <Route path='/tv/:type' element={<Movie/>}/>
                    <Route path='/movie/:type/:id' element={<Detail/>}/>
                    <Route path='/tv/:type/:id' element={<Detail/>}/>
                </Routes>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
