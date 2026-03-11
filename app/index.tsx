import { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput } from 'react-native';
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, {
        //fetch jalar informacion
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json(); //json convertir a objeto
        setResults(data.results);
      } else {
        console.log("Bad request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  };

  const filterPokemon = (text: string) => {

    if (text == "") {
      getPokemons();
      return;
    }
    const arrayFiltered = results.filter((pokemon) => pokemon.name.includes(text));
    setResults(arrayFiltered)
  };


  

  return (
    <ScrollView>      

      <TextInput onChangeText={filterPokemon} placeholder="Search Pokémon..." />

      {results.map((item) => {
        return (
          <PokemonCard
            key={item.name}
            name={item.name}
            url={item.url}
          ></PokemonCard>
        );
      })}
    </ScrollView>
  );
}

