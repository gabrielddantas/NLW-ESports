import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { IGameProps } from "../../screens/Home";

import { THEME } from "../../theme";
import { styles } from "./styles";

type GameCardProps = Omit<IGameProps, "id" | "_count">;

interface GameComponentProps extends GameCardProps, TouchableOpacityProps {
  count: number;
}

export function GameCard({
  title,
  banner,
  count,
  ...rest
}: GameComponentProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: banner }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.ads}>{count} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
