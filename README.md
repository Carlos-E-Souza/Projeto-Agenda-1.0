# Projeto Orion

<h1 align="center"><img width="300" heigth="300" src="/documents/logo.png" alt="Logotipo"/></h1>

## Integrantes do Grupo

- [Carlos Eduardo](https://github.com/Carlos-E-Souza)
- [Gabriel Ferreira](https://github.com/oo7gabriel)
- [Leandro Almeida](https://github.com/LeanArs)
- [Leandro Souza](https://github.com/Leanddro13)
- [Mariana Fonseca](https://github.com/Mari23Fonseca)

## Pré-Requisitos

Para utilizar a aplicação é necessário ter instalado o [Nodejs](https://nodejs.org/en/) versão ``` ^16.0.0``` ou superior, [MongoDB](https://www.mongodb.com/try/download/community) versão ``` ^4.0.0```.

## Passo para rodar a aplicação

Primero abra dois terminais um para o front e outro para o backend em seguida realize os seguintes passos.

### Frontend
1° terminal

- Passo 1 -  ``` cd front ```<br/>
- Passo 2 -  ``` npm i ```<br/>
- Passo 3 -  ``` npm start ```<br/>
- Passo extra: Caso o back não consiga utilizar a porta 9000 será necessario alterar o REACT_APP_API_URL no arquivo .env do front para a porta que o back está utilizando que está no arquivo back/app.js. Obs: tanto a port do .env quanto a do app.js tem que ser a mesma.

### Backend
2° terminal

- Passo 4 - ``` cd back ```<br/>
- Passo 5 - ``` npm i ```<br/>
- Passo 6 - ``` npm start ```<br/>
- Passo extra: Caso não consiga conectar-se com o mongoDB rodando na sua máquina, vá até o arquivo back/config/default.json e mude o DATABASE_URL para a url do seu mongoDB local.

Após realizar esses passos será aberto no navegador a aplicação, não feche os terminais,pois eles estarão rodando sua aplicação.
Caso queira encerrar a aplicação realize os seguintes passos nos dois terminais: <br/>
Passo 1 - ``` Ctrl + c ``` ou ``` Ctrl + d ```. 
___
<h4 align="center"> Desenvolvido por Orion 2022 </h4>