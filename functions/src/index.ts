import * as functions from 'firebase-functions'
import db from './db'
import { buildPlayer } from './player'

const PlayerRef = db.collection('players')

export const saveGame = functions.https.onRequest(async(req, res) => {
  for (const player of req.body.players) {
    const ref = PlayerRef.doc(player.playerId)
    const result = (await ref.get()).data() ?? buildPlayer()
    const resultRole = result[player.asRole]

    if (!resultRole) {
      res.status(401).send({ error: "That role doesn't exist" })
      return
    }

    resultRole.games += 1
    result.total.games += 1

    if (player.won) {
      resultRole.wins += 1
      result.total.wins += 1
    }

    ref.set(result)
  }

  res.status(201).send()
})

export const getPlayer = functions.https.onRequest(async(req, res) => {
  const results = (await PlayerRef.doc(req.body.id).get()).data()
  if (!results) {
    res.send(buildPlayer())
    return
  }
  res.send(results)
})
