const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3000

app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const accessTokens = new Set()

const accounts = JSON.parse(fs.readFileSync('data/accounts.json', 'utf8'))

app.post('/identity/v2/oauth2/token', (req, res) => {
  const authStr = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString()
  console.log(Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString())
  const [clientId, clientSecret] = authStr.split(':')
  // if (clientId !== 'client_id' || clientSecret !== 'client_secret') {
  // res.status(400).json({ message: 'Invalid auth token' });
  // }
  // Generate a string
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  accessTokens.add('Bearer ' + token)
  res.json({ access_token: token, token_type: 'Bearer', expires_in: 1799, scope: 'accounts' })
})

app.get('/za/pb/v1/accounts', (req, res) => {
  const returnAccounts = []
  for (let i = 0; i < accounts.length; i++) {
    const account = {
      accountId: accounts[i].accountId,
      accountNumber: accounts[i].accountNumber,
      accountName: accounts[i].accountName,
      referenceName: accounts[i].referenceName,
      productName: accounts[i].productName
    }
    returnAccounts.push(account)
  }
  const data = { accounts: returnAccounts }
  formatResponse(data, req, res)
})

app.get('/za/pb/v1/accounts/:accountId/balance', (req, res) => {
  const accountId = req.params.accountId
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountId === accountId) {
      const data = {
        accountId,
        currentBalance: accounts[i].currentBalance,
        availableBalance: accounts[i].availableBalance,
        currency: accounts[i].currency
      }
      formatResponse(data, req, res)
      break
    }
  }
  return res.status(404).json()
})

app.get('/za/pb/v1/accounts/:accountId/transactions', (req, res) => {
  const accountId = req.params.accountId

  const fromDate = req.query.fromDate ?? null // set to 180 in the passed
  const toDate = req.query.toDate ?? null // set to today
  const transactionType = req.query.transactionType ?? null

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountId === accountId) {
      const transactions = []
      for (let j = 0; j < accounts[i].transactions.length; j++) {
        if (transactionType !== null && accounts[i].transactions[j].transactionType !== transactionType) {
          continue
        }
        // compare both dates together
        if (fromDate !== null && new Date(accounts[i].transactions[j].transactionDate) < new Date(fromDate)) {
          continue
        }
        if (toDate !== null && new Date(accounts[i].transactions[j].transactionDate) > new Date(toDate)) {
          continue
        }
        transactions.push(accounts[i].transactions[j])
      }
      const data = { transactions }
      formatResponse(data, req, res)
      break
    }
  }
  return res.status(404).json()
})

app.get('/za/v1/cards/countries', (req, res) => {
  const authorization = req.get('authorization')
  if (!accessTokens.has(authorization)) {
    return res.status(401).json()
  }
  fs.readFile('data/countries.json', 'utf8', function (err, data) {
    if (err) throw err
    res.json(JSON.parse(data))
  })
})

app.get('/za/v1/cards/currencies', (req, res) => {
  const authorization = req.get('authorization')
  if (!accessTokens.has(authorization)) {
    return res.status(401).json()
  }
  fs.readFile('data/currencies.json', 'utf8', function (err, data) {
    if (err) throw err
    res.json(JSON.parse(data))
  })
})

app.get('/za/v1/cards/merchants', (req, res) => {
  const authorization = req.get('authorization')
  if (!accessTokens.has(authorization)) {
    return res.status(401).json()
  }
  fs.readFile('data/merchants.json', 'utf8', function (err, data) {
    if (err) throw err
    res.json(JSON.parse(data))
  })
})

const formatResponse = (data, req, res) => {
  res.json({
    data,
    links: {
      self: req.protocol + '://' + req.get('host') + req.originalUrl
    },
    meta: {
      totalPages: 1
    }
  })
}

app.listen(port, () => console.log(`Programmable banking sim listening on port ${port}!`))
