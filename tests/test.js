require('../server.js')
const url = 'http://localhost:' + process.env.PORT

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect } = chai

describe('Testando fluxo da API', () => {
    const client = chai.request(url)
    const usuario = {
        nome: 'Test',
        login: 'test@gmail.com',
        senha: '123',
        tipo: 'prestador'
    }
    let token = null
    it('Criar novo usuário', done => {
        client.post('/usuario')
            .send(usuario)
            .end((_, res) => {
                const body = getBody(res)
                for (const prop in usuario)
                    if (prop !== 'senha') {
                        expect(body[prop]).equals(usuario[prop], `Propriedade ${prop} é diferente`)
                        usuario[prop] = body[prop]
                    }
                usuario._id = body._id

                expect(body).property('_id')

                done()
            })
    })
    it('Login', done => {
        client.post('/login')
            .send(usuario)
            .end((_, res) => {
                expect(res).status(200)
                const body = getBody(res)
                expect(body).property('token')
                token = body.token
                done()
            })
    })

    const servico = {
        nome: 'Serviço teste',
        preco: 10
    }
    it('Criar serviço', done => {
        servico.idPrestador = usuario._id
        client.post('/servico')
            .set('authorization', token)
            .send(servico)
            .end((_, res) => {
                const body = getBody(res)
                expect(body).property('_id')
                servico._id = body._id

                done()
            })
    })
    it('Excluir serviço', done => {
        client.delete('/servico/' + servico._id)
            .set('authorization', token)
            .end((_, res) => {
                const body = getBody(res)
                expect(body).property('_id')
                expect(body._id).equals(servico._id, 'Ids diferentes')
                done()
            })
    })

    it('Excluir usuário', done => {
        client.delete('/usuario/' + usuario._id)
            .set('authorization', token)
            .end((_, res) => {
                const body = getBody(res)
                expect(body).property('_id')
                expect(body._id).equals(usuario._id, 'Ids diferentes')
                done()
            })
    })
})

const getBody = res => {
    expect(res).property('body')
    return res.body
}
