import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer>

            <p><Link to="https://www.cambridge.org" target='_blank'><strong>www.cambridge.org</strong></Link></p>
            <p>Technical Assessment for Senior Frontend Developer</p>
            <p>Prepared by Alain Lim (me@alainmlim.com)</p>

        </footer>
    )

}

export default Footer