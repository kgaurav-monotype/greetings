import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container splash">
            <h2 className="heading">404</h2>
            <p className="desc">Oops! Page not found.</p>
            <Link to="/" className="btn">Start</Link>
        </div>
    )
}
