# Project Api NodeJS


### Trata-se de uma API para uma loja online de instrumentos musicais.

Após Clonar o Repositório, basta rodar o comando "make up" dentro do diretório onde se encontra o código.
Serão realizados os Downloads das imagens necessárias para a montagem automática dos Containers via Docker.
Após o Download as mensagens "Creating db_mongo ...done" e "Creating api ...done" deverão aparecer no seu prompt de comando, indicando que os serviços já estão ok na sua máquina local e pode começar a utilizar.


### Features

- [x] Cadastro e Login do usuário
- [x] Cadastro, Edição, Remoção, Listagem e Pesquisa de categorias
- [x] Cadastro, Edição, Remoção, Listagem e Pesquisa de produtos

# EndPoints

## Usuário
#### POST - http://localhost:3001/usuario/cadastrar
* {
	"email": "email.email@gmail.com",
	"senha": "senhaDHYBb",
	"nome": "Carlos Augusto",
	"idade": 21
}


#### POST - http://localhost:3001/usuario/login
* {
	"email": "email.email@gmail.com",
	"senha": "senhaDHYBb"
}  
#

## Categoria
#### POST - http://localhost:3001/categoria/cadastrar
* Content-Type: application/json - Authorization: Bearer
* {
    "codigo": 4,
    "descricao": "Microfones"
} - token

#### POST - http://localhost:3001/categoria/atualizar
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": 2,
	"descricao": "Acessorios"
} - token

#### POST - http://localhost:3001/categoria/remover
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": 4
} - token

#### GET  - http://localhost:3001/categoria/listar
* Content-Type: application/json - Authorization: Bearer
* token

#### POST - http://localhost:3001/categoria/buscar_cod
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": 2
} - token
#

## Produto
#### POST - http://localhost:3001/poduto/cadastrar
* Content-Type: application/json - Authorization: Bearer
* {
    "codigo": "653647799981",
    "descricao": "Microfone Beta58 - Shure ",
    "quantidade": 8,
    "categoria": 4,
    "preco": 157.9
  } - token
  
#### POST - http://localhost:3001/poduto/atualizar
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": "765848651981",
  "descricao": "Pele 12 - Evans",
  "quantidade": 9,
  "categoria": 2,
  "preco": 130.0
} - token

#### POST - http://localhost:3001/poduto/remover
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": 765847891981
} - token

#### GET  - http://localhost:3001/poduto/listar
* Content-Type: application/json - Authorization: Bearer
* token

#### POST - http://localhost:3001/poduto/buscar_cod_barras
* Content-Type: application/json - Authorization: Bearer
* {
	"codigo": "654847891981"
} - token