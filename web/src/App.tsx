import "./styles/main.css";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { Header } from "./components/Header";
import { IGameProps, ListGameCards } from "./components/ListGameCards";
import * as Dialog from "@radix-ui/react-dialog";
import { PostGameAdsModal } from "./components/PostGameAdsModal";
import { Modal } from "./components/Modal";
import { Api } from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState<IGameProps[]>([]);

  const getAllGames = async () => {
    const data = await Api.get("/games");
    setGames(data.data);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Header />

      <ListGameCards games={games} />

      <Modal title={"Publique um anúncio"}>
        <PostGameAdsModal games={games} />
      </Modal>
    </div>
  );
}

export default App;
