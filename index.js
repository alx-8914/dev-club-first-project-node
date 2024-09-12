/*      CONCEITOS BÁSICOS SOBRE NODE.JS
      - Query parms => meusite.com/users?name=Alexsandro&age=42 // FILTROS
      - Route parms => /users/2    //Buscar, Deletar ou Atualizar Algo Específico = ID
      - Request Body => {"name": "Alexsandro", "age": 42}

      - GET          => Buscar informação no back-end
      - POST         => Criar informação no back-en
      - PUT / PATCH  => Alterar/ Atualizar informação no back-end
      - DELETE       => Deletar informação no back-end
      - MIDDLEWARES  => INTERCEPTADOR => Tem o poder de para ou alterar dados de requisição
      
      // Ou const {name, age} = req.query (Destructuring assigment

      /*Resultado => Executando o meu primeiro middleware
const myFirstMiddleware = (req, res, next) => {
  console.log('Executando o meu primeiro middleware')

  next()// continua no fluxo da aplicação
  console.log('Finalizamos')
A rota foi chamda
Finalizamos
}
app.use(myFirstMiddleware)//Executando o meu primeiro middleware
*/
//Projeto Node.js via terminal e insomnia.
//Primeiro Servidor em rota Tipo = 'Get'
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const port = 3001
const status = 404
const app = express();
app.use(express.json()); // Avisar  pro express usar json no body
app.use(cors()); //Avisar pro express usar cors, obs no modo prof. cadastrar um link(site)

//Rota respondia com mensagem 'Hello World'
const users = []

const checkUserId = (req, res, next) => {
  const { id } = req.params

  const index = users.findIndex(user => user.id === id)

  if (index < 0) {
    return res.status(404).json({ message: `🚨User not found ${status}` })
  }

  req.userIndex = index
  req.userId = id

  next()
}

app.get('/users', (req, res) => {

  return res.json({ users })
})

app.post('/users', (req, res) => {
  const { name, age } = req.body
  const user = { id: uuid.v4(), name, age }  // Gera um novo usuário com um ID único
  
  users.push(user)  // Adiciona o novo usuário à lista de usuários

  return res.status(201).json(user) // Retorna apenas o novo usuário
});

app.put('/users/:id', checkUserId, (req, res) => {
  const { name, age } = req.body
  const index = req.userIndex
  const id = req.userId

  const updatedUser = { id, name, age } //Usuário Autualizaado


  users[index] = updatedUser

  return res.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (req, res) => {
  const index = req.userIndex

  users.splice(index, 1) //Remove o usuário do array users

  return res.status(204).json();
})
//Porta de Acesso Única = Usando nodemon 
app.listen(port, () => {
  console.log(`🚀Server started on port ${port}`);
});