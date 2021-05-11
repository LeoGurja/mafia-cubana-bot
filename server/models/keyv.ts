import Keyv from 'keyv'

const keyv = new Keyv()

keyv.on('error', err => console.error('Keyv connection error:', err))
keyv.clear()

export default keyv
