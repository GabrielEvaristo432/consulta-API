var express = require('express');
var router = express.Router();
const axios = require('axios');
const { response } = require('express')

/* GET users listing. */
router.get('/:username/', function(req, res, next) {
  const username = req.params.username;
  // const url = `https://api.github.com/users/${username}`

  //Versão 1
  // axios.get(url)
  // .then((response) =>{
  //   const dados = response.data
  //   axios.get(`https://api.github.com/users/${username}/following`)
  //   .then((response) =>{
  //     const following = response.data
  //     res.render('index', { dados: dados, foll: following})
  //   })
  // })
  // .catch((error) => {
  //   res.render('error', {message: `Usuário ${username} não encontrado`, error: error})
  // })

  //Versão 2
  const urls = [
    `https://api.github.com/users/${username}`,
    `https://api.github.com/users/${username}/following`
  ]
  // Outra opção de requisição
  // axios.all([axios.get(urls[0]), axios.get(urls[1])])
  axios.all(urls.map((u) => axios.get(u)))
  .then(
    axios.spread((usuario, seguindo) =>{
      res.render('index', { dados: usuario.data, foll: seguindo.data})
    })
  )
  .catch((error) => {
    res.render('error', {message: `Usuário ${username} não encontrado`, error: error})
  })
});

module.exports = router;
