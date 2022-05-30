import React from 'react';
import { Link } from 'react-router-dom';

import RMDBLogo from '../../images/CreatureCodesMovies.png';

import { Wrapper, Content, LogoImg } from './Header.styles';

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
            <LogoImg src={RMDBLogo} alt='rmdb-logo' />
            </Link>
        </Content>
    </Wrapper>
);

export default Header;