## Installation

# Investec Programmable Banking Open API Simulator

A nodejs server to get eveyone building and demoing regardless whether you have an account.

![GitHub](https://img.shields.io/github/license/devinpearson/programmable-banking-sim)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=round-square)](https://github.com/devinpearson/programmable-banking-sim/pulls)

### Installation
Before installing, [download and install Node.js](https://nodejs.org/en/download/).

```bash
git clone https://github.com/devinpearson/programmable-banking-sim.git
cd programmable-banking-sim
```
```bash
npm install
```

### Usage
To start the simulator, run the following
```bash
npm run dev
```

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/26868804-62ce3cf6-3d98-4f62-ad82-b912b9826d51?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D26868804-62ce3cf6-3d98-4f62-ad82-b912b9826d51%26entityType%3Dcollection%26workspaceId%3D37bb2e58-4709-4bd4-8b2c-b00fe7445371)

This will start the simulator on http://localhost:3000

Supported endpoints

Auth
- /identity/v2/oauth2/token

Accounts
- /za/pb/v1/accounts
- /za/pb/v1/accounts/:accountId/balance
- /za/pb/v1/accounts/:accountId/transactions

Cards
- /za/v1/cards/countries
- /za/v1/cards/currencies
- /za/v1/cards/merchants

Mock API only endpoints
- POST /za/pb/v1/accounts/:accountId/transactions - Creates and inserts a transaction into the history
- DELETE /za/pb/v1/accounts/:accountId/transactions/2023-01-22 - Deletes transactions from account for a particular postingDate
- POST /za/pb/v1/accounts - Create a new account
- DELETE /za/pb/v1/accounts/:accountId - Deletes the account and its transactions

Programmable documentation can be found here: https://developer.investec.com/programmable-banking/


https://sqlitebrowser.org/