require('dotenv').config({ path: './.env' })

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Usuario = require('./src/model/usuario.js')

//conexao com banco dados
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (error) => {
  console.error("ERRO" + error.message);
});

const app = express()
app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
    if (req.path === '/usuario' && req.method === 'POST' || req.path === '/login')
        return next()

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Token deve ser informado' })

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET, null, null)
        const usuario = Usuario.findById(_id)
        if (!usuario) return res.status(401).json({ error: 'Token inválido' })
        req.usuario = usuario
        next()
    } catch (e) {
        return res.status(401).json({ error: 'Falha ao obter o token' })
    }
})
app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log('Rodando em http://localhost:' + process.env.PORT)
})
