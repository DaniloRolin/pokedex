import styles from "../styles/Card.module.css";

import Image from "next/image";
import Link from "next/link";

export default function Card({ pokemon }) {
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png
  //https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif
  //https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png - usada antes no projeto

  return (
    <div className={styles.card}>
      <Image
        src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif`}
        width="100%"
        height="100%"
        alt={pokemon.name}
      />

      <p className={styles.id}>#{pokemon.id}</p>

      <h3 className={styles.title}>{pokemon.name}</h3>

      <Link href={`/pokemon/${pokemon.id}`}>
        <a className={styles.btn}>Detalhes</a>
      </Link>
    </div>
  );
}
