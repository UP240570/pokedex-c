import React from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const id = props.url.split("/").filter(Boolean).at(-1);
  console.log(id);
  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <Pressable
      onPress={() => router.push(`/pokemon/${props.name}`)}
      style={({ pressed }) => [
        styles.PressableStyle,
        pressed && { opacity: 0.5 }
      ]}
    >
      <Image
        source={{ uri: pokemonImageURL }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>{props.name}</Text>
      <Text>{props.url}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PressableStyle: {
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#10c5e5",
  },
});
