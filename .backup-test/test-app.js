const {describe, it} = require('mocha')
const {expect} = require('chai')
const app = require('../src/app')
const fetch = require('node-fetch')

describe('app', () => {
  let server
  beforeEach((done) => {
    server = app.listen(0, done)
  })

  afterEach((done) => {
    if (server) server.close(done)
    server = undefined
  })

  const checkGet = async (expectedValue) => {
    const response = await fetch(`http://localhost:${server.address().port}/counter`)

    expect(response.status).to.equal(200)

    const responseJson = await response.json()

    expect(responseJson).to.deep.equal({ counter: expectedValue})
  }

  const resetCounter = async (value) => {
    const response = await fetch(`http://localhost:${server.address().port}/counter`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({counter: value})
    })

    expect(response.status).to.equal(200)

    const responseJson = await response.json()

    expect(responseJson).to.deep.equal({ counter: value })
  }

  it('should get a zero value on initialization', async () => {
    await checkGet(0)
  })

  it('should increment the counter on POST /counter/increment', async () => {
    await resetCounter(4)
    const response = await fetch(`http://localhost:${server.address().port}/counter/increment`, {
      method: 'POST'
    })

    expect(response.status).to.equal(200)

    const responseJson = await response.json()

    expect(responseJson).to.deep.equal({ counter: 5 })

    await checkGet(5)
  })

  it('should decrement the counter on POST /counter/decrement', async () => {
    await resetCounter(7)
    const response = await fetch(`http://localhost:${server.address().port}/counter/decrement`, {
      method: 'POST'
    })

    expect(response.status).to.equal(200)

    const responseJson = await response.json()

    expect(responseJson).to.deep.equal({ counter: 6 })

    await checkGet(6)
  })
})