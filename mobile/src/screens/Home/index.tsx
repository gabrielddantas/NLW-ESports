import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Api } from "../../services/Api";
import { GAMES } from "../../utils/games";
import { styles } from "./styles";

export interface IGameProps {
  id: string;
  title: string;
  banner: string;
  _count: {
    Ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<IGameProps[]>([]);
  const navigation = useNavigation();

  const getAllGames = async () => {
    try {
      const games = await Api.get("/games");

      setGames(games.data);
    } catch (error) {
      console.log("Error fetching games -> ", error);
    }
  };

  const handleOpenGame = ({ id, title, banner }: IGameProps) => {
    navigation.navigate("game", { id, title, banner });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu Duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              banner={item.banner}
              count={item._count.Ads}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
