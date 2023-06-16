import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'

import { useRouter } from 'next/router'

export const getStaticPaths = async () => {

  const maxPokemons = 252
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons}`)

  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {

    return {
      params: { pokemonId: index.toString() },
    }

  })

  return {
    paths,
    fallback: true,
  }

}

export const getStaticProps = async (context) => {

  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}


export default function Pokemon({ pokemon }) {

  // console.log(pokemon)

  const router = useRouter()

  if (router.isFallback){
    return (<p>Carregando .....</p>)
  }

    return (
      <div className={styles.pokemon_container}>

        <h1 className={styles.title}>{pokemon.name}</h1>

        <Image
          // src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
          src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif`}
          width="100%"
          height="100%"
          alt={pokemon.name}
        />
        <div>
          <h3>Número:</h3>
          <p>#{pokemon.id}</p>
        </div>
        <div>
          <h3>Tipo:</h3>

          <div className={styles.types_container}>

            {pokemon.types.map((item, index) => (
              <span
                key={index}
                className={`${styles.type} ${styles['type_' + item.type.name]}`}
              >
                {item.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.data_container}>

          <div className={styles.data_height}>
            <h4>Altura:</h4>

            <p>{pokemon.height * 10} cm</p>
          </div>

          <div className={styles.data_weight}>
            <h4>Peso:</h4>
            <p>{pokemon.weight / 10} kg</p>
          </div>
        </div>

      </div>
    )
}
