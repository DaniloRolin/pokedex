import Card from "../components/Card";

import Image from "next/image";

import styles from "../styles/Home.module.css";

import { useMemo, useState } from "react";

export async function getStaticProps() {
  const maxPokemons = 252;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  const data = await res.json();

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  // console.log(pokemons)

  const [busca, setBusca] = useState("");

  //filtrando pokemons
  const pokemonFiltered = useMemo(() => {
    const lowerBusca = busca.toLocaleLowerCase();

    return pokemons.filter((pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(lowerBusca)
    );
  }, [busca, pokemons]);

  // if (busca.length == 0) {
  //   return (
  //     <>
  //       <div className={styles.title_container}>
  //         <h1 className={styles.title}>
  //           Poke<span>Next</span>
  //         </h1>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>

        <Image
          src="/images/pokeball.png"
          width="50"
          height="50"
          alt="PokeNext"
        />
      </div>

      <input
        className={styles.search}
        placeholder="Pesquise seu pokémon"
        type="text"
        value={busca}
        onChange={(ev) => {
          setBusca(ev.target.value);
        }}
      />

      <div className={styles.pokemon_container}>
        {pokemonFiltered.length ? (
          pokemonFiltered.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <h1 className={styles.title}>
            Sua busca não retornou nenhum resultado
          </h1>
        )}
      </div>
    </>
  );
}
