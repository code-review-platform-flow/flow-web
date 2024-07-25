'use client'
import React from 'react';
import styled from 'styled-components';
import gachonLogo from '../../../public/logos/gachonLogo.svg';
import Image from 'next/image';


const Footer = () => {
    return (
        <>
            <FooterLogo src={gachonLogo} alt='schoolLogo'/>
        </>
    );
};

export default Footer;

const FooterLogo = styled(Image)`
    position : absolute;
    bottom : 1.5em;
    left : 1.5em; 
`;