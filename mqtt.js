const clientId = 'klossel_' + Math.random().toString(16).substr(2, 8)

const host = 'wss://mqtt.hva-robots.nl:1883/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  username: 'klossel',
  password: 'HktRynjxATM0DjYZjoC7',
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})
