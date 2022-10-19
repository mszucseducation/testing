import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
// This allows us to do client side routing with the link
import Link from 'next/Link';
import { LazyLoadImage } from "react-lazy-load-image-component";


// SSG - Static Site Generation
// Static Page Rendering 
// You do not have to wait for the page to load
export default function Home({pokemon}) {
  console.log(pokemon);
  return (
    <Layout title="Next JS Pokedex">
      <Head>
        <title>Pokedex Demo</title>
      </Head>
        <h1 className="text-4xl mb-8 text-center">
          Next JS Pokedex
        </h1>
        <ul>
          {pokemon.map((pokeman, index) => (
            <li key={index}>
              {/**Array base index's start at 0 so we need to add +1 */}
              <Link href={`/pokemon?id=${index + 1}`} >
                <div className="border p-4 border-neutral my-2">
                <a className="capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <img className="w-20 h-20 mr-3" src={pokeman.image} alt={pokeman.name}/>
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  {pokeman.name}
                </a>
                </div>
              </Link>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

// this should be a static page at build time
export async function getStaticProps(content) {
  try{
    const limitNumber = 20;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitNumber}`);
    const {results} = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image
      }
    })
    return {
      props: {pokemon},
    };
  } catch(err) {
    console.error(err);
  }
  return {
    props: {}
  }
}
