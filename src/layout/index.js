import React from 'react';
import Sidebar from "./sidebar"
import './index.scss'
import Header from "./header/index";

function Index(props) {
    return (
        <div className="layout">
            <Header/>
            <div className="layout__main">
                <div className="menu">
                    <Sidebar/>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Index;
