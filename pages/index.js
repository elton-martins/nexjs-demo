import Head from 'next/head'

import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react/cjs/react.production.min'

/*const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address',
        description: 'This is the First Meetup',
    },
    {
        id: 'm2',
        title: 'Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address',
        description: 'This is the Second Meetup',
    },
    {
        id: 'm3',
        title: 'Third Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address',
        description: 'This is the Third Meetup',
    },
    {
        id: 'm4',
        title: 'Fourth Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address',
        description: 'This is the Fourth Meetup',
    },
]*/

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>

            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://eltonmartins:6jl98sAf3Dh5WQVa@cluster0.tmm2b.mongodb.net/meetups?retryWrites=true&w=majority'
    )

    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    }
}

/*export async function getServerSideProps(context) {
const req = context.req
const res = context.res

    return {
        props: DUMMY_MEETUPS,
    }
}*/

export default HomePage
