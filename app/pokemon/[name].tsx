import { useLocalSearchParams, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function PokemonDetailScreen() {
  const params = useLocalSearchParams();
  const [pokemonData, setPokemonData] = useState(null);
  
  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemonData();
  }, []);

  const getPokemonData = async () => {
    try {
      const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
      const response = await fetch(URL, {
        //fetch jalar informacion
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json(); //json convertir a objeto
        setPokemonData(data);
      } else {
        console.log("Bad request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  };
  return (
    <ScrollView>
      
      <Text>{params.name}</Text>
      <Text>{JSON.stringify(pokemonData)}</Text>
    </ScrollView>
  );
}
