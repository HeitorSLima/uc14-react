import './App.css'
import { useState } from 'react';

function App() {

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarPokemonAleatorio() {
    const id = Math.floor(Math.random() * 1025) + 1;

    setLoading(true);

    try{
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      const dados = await resposta.json();

      setPokemon(dados);
    } catch(erro){
      console.error("Erro ao buscar pokemón: ", erro);
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <h1>Pokemon aleatório</h1>
        <button onClick={buscarPokemonAleatorio}>Buscar pokemón</button>

        {loading && <p>Carregando...</p>}

        {pokemon && !loading && (
          <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        )}
      </main>
    </>
  )
}

export default App
