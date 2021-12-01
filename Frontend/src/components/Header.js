import Titulo from './Titulo'
import React, {Component} from 'react';

class Header extends Component {
    render () {
        return (
            <section className="section">
                <header>
                    <Titulo>Mis Mascotas</Titulo>
                </header>
            </section>
        )
    }
} 
export default Header;