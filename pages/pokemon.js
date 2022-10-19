import React from 'react'
import Layout from '../components/Layout/Layout'
import Link from 'next/Link';
import { Card, Icon, Image } from 'semantic-ui-react'


// SSR - Server-side Rendering
// This is a server side rendered page
// this option is always slower
//However it allows you to respond to any request that a user makes
// pulls the most recent content
// Can selectively hide content from unauthenticated users.
// Why SSG is important: if response changes depending who is viewing the page
export default function pokemon({pokeman}) {
    console.log(pokeman);
    return (
        <Layout title={pokeman.name}>
            <Card>
                <Image className="mx-auto w-2/4" src={pokeman.image} wrapped ui={false} />
                <Card.Content>
                <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
                <Card.Meta>
                    <p><span className="font-bold mr-3">Weight:</span>{pokeman.weight}</p>
                    <p><span className="font-bold mr-3">Height:</span>{pokeman.height}</p>
                </Card.Meta>
                <Card.Description>
                    <h2 className="text-2xl mt-6 mb-2">Moves:</h2>
                    {pokeman.moves.map((move, index) => (
                            <p key={index}>{move.move.name}</p>
                        )
                    )}
                </Card.Description>
                </Card.Content>
            </Card>
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">
                        Home
                    </a>
                </Link>
            </p>
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedIndex = ("00" + (id)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        pokeman.image = image;
        return {
            props: { pokeman },
        }
    } catch(err) {
        console.error(err);
    }
}
