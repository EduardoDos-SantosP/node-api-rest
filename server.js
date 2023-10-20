require('dotenv').config({ path: './.env' })

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

//conexao com banco dados
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
//promisse padrao do ambiente -- verificar necessidade
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.error("ERRO" + error.message);
});


const app = express()
app.use(express.json())
app.use(cors())
app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log('Rodando em http://localhost:' + process.env.PORT)
})
