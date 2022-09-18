import React from 'react';
import logo from '../../assets/logo.svg';


// import { Container } from './styles';

export const Header: React.FC = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
      <img src={logo} alt="logo" />

      <h1 className="text-6xl text-white mt-20 font-bold">
        Seu{" "}
        <span className="bg-nlwGradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>
    </div>
  );
}

