# brain-ag-test

## Descrição

O projeto é uma API em Node.js desenvolvida com Typescript e Express, seguindo o padrão arquitetural Hexagonal (Ports and Adapters).

### Fluxos
1. Criar Produtor

Criação de um produtor seguindo o modelo de dados

CPF ou CNPJ
Nome do produtor
Nome da Fazenda
Cidade
Estado
Área total em hectares da fazenda
Área agricultável em hectares
Área de vegetação em hectares
Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

## Regras de negócio
O CPF/CNPJ pode ser informado com ou sem máscara.
Realizadas as validações de CPF/CNPJ
Ao informar um documento já existente é retornado a informação do cadastra já realizado.

2. Atualizar Produtor

Atualização das informações do produtor com base no identificador.

## Regras de negócio
A atualização do produtor é realizada com base na chave criada no cadastro.

3. Exclusão do Produtor

Exclusão do produtor com base no identificador.

## Regras de negócio
A exclusão é realizada com base na chave criada no cadastro.

4. Listagem de Fazendas

### Collections(Postman)

https://drive.google.com/file/d/1CSRwqr7lO3CTf4yj8ggUYrVnxotyCZ0Z/view?usp=sharing

## Instalação e Execução

Para executar o projeto localmente, siga as etapas abaixo:

1. Certifique-se de ter o Node.js e o Docker instalados em sua máquina.
2. Clone este repositório.
3. Substitua as variaveis de ambiente.
4. Acesse o diretório do projeto via terminal.
5. Execute o comando `npm install` para instalar as dependências.
6. Execute o comando `docker-compose up -d` para iniciar o container do banco de dados PostgreSQL.
7. Execute o comando `npm run migrate` para criação das migrations.
8. Execute o comando `npm run build` para buildar a aplicação.
9. Execute o comando `npm run start` para iniciar a aplicação.

## Configuração

Você pode configurar algumas variáveis de ambiente para o funcionamento adequado do projeto. Para isso, renomeie o arquivo `.env.example` para `.env` e defina os valores necessários.

Inicialmente as variaveis de ambiente docker-compose foram mantidas hard-coded.

## Melhorias de Produto a serem desenvolvidas.

1. Utilização e implementação de testes utilizando o repositório de memória.
2. Conteinerização da API.
3. Divisão da entidade Producer criando a entidade Farm.
4. Criação da Factory Dashboard para gerenciamento das informação listadas.
5. Melhorias nas validações de tipo de plantio.

