import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={Styles.bg}>
            <h1>VIDEOGAMES APP</h1>
            <div>
                <Link to='/home'>
                <button target='_blank'>E N T E R</button>
                </Link>
            </div>
        </div>
    )
}
