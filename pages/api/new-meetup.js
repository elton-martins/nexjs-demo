import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const client = await MongoClient.connect(
            'mongodb+srv://eltonmartins:6jl98sAf3Dh5WQVa@cluster0.tmm2b.mongodb.net/meetups?retryWrites=true&w=majority'
        )

        const db = client.db()

        const meetupCollection = db.collection('meetups')
        const result = await meetupCollection.insertOne(data)

        client.close()

        res.status(201).json({ message: 'Meetup Inserted' })
    }
}

export default handler

//eltonmartins - 6jl98sAf3Dh5WQVa
