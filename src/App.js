import './App.css';
import {Route, Routes} from "react-router-dom";
import './assets/constants.scss'
import 'antd/dist/antd.css';

import Layout from "./layout"
import Home from "./pages/home"
import Booking from "./pages/booking"
import Check from "./pages/check"
import {useDispatch} from "react-redux";
import {getAllData} from "./store";
import {useEffect, useState} from "react";

function App() {

    const [values, setValues] = useState({
        room_number: undefined,
        date: undefined
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <Layout>
                        <Home/>
                    </Layout>
                }/>
                <Route path='/add' element={
                    <Layout>
                        <Booking/>
                    </Layout>
                }/>
                <Route path='/check' element={
                    <Layout>
                        <Check values={values} setValues={setValues}/>
                    </Layout>
                }/>
            </Routes>
        </div>
    );
}

export default App;
