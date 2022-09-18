import React from 'react';
import { IGameProps } from '../..';

// import { Container } from './styles';

type GameBunner = Omit<IGameProps, 'id' | '_count'>

interface GameBunnerProps extends GameBunner {
  count: number;
}

export const GameBanner = ({title, banner, count}: GameBunnerProps) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={banner} alt={title} />
      <div className="w-full pt-16 pb-4 px-4 bg-shadow absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          {title}
        </strong>
        <span className="text-zinc-300 text-sm block">{count} anúncio(s)</span>
      </div>
    </a>
  )
}
