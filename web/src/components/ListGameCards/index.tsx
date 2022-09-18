import React, { useEffect, useState } from "react";
import { Api } from "../../services/api";
import { GameBanner } from "./components/GameBanner";

export interface IGameProps {
  id: string;
  title: string;
  banner: string;
  _count: {
    Ads: number;
  };
}

type ListGameProps = {
  games: IGameProps[];
};

export const ListGameCards = ({ games }: ListGameProps) => {
  return (
    <div className="grid grid-cols-6 gap-6 mt-16">
      {games.map((game: any) => {
        return (
          <GameBanner
            title={game.title}
            banner={game.banner}
            count={game._count.Ads}
            key={game.id}
          />
        );
      })}
    </div>
  );
};
