import React from 'react';
import './index.scss'
import {NavLink} from "react-router-dom";

function Index() {
    const routes = [
        {
            title: 'Home',
            route: '/'
        },
        {
            title: 'Add booking',
            route: '/add'
        },
        {
            title: 'Check Room',
            route: '/check'
        },
    ]
    return (
        <div className="sidebar">
            {
                routes?.map((i, k) => {
                    return (
                        <NavLink activeclassname="active" to={i.route} key={k}>
                            {i.title}
                        </NavLink>
                    )
                })
            }
        </div>
    );
}

export default Index;
