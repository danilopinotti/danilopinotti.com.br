---
title: Primeiros passos com Docker
description: 'O principal objetivo desta postagem não é aprofundar no funcionamento interno do Docker, e sim nas definições básicas e nos primeiros passos para utilizá-lo.'
image: /images/articles/docker-logo.png
keywords: tecnologias, docker, docker 101, docker-compose, linux
publishedAt: 2017-01-07T21:00:00
tags: docker
author:
  name: Danilo Pinotti
---

# Primeiros passos com Docker
![Docker logo](/images/articles/docker-logo.png "Docker")

O principal objetivo desta postagem não é aprofundar no funcionamento interno do Docker, quem sabe numa postagem futura, e sim nas definições básicas e nos passos iniciais para utilizá-lo.

## Sobre o Docker
> "Docker containers wrap a piece of software in a complete filesystem that contains everything needed to run: code, runtime, system tools, system libraries -- anything that can be installed on a server. This guarantees that the software will always run the same, regardless of its environment."

> "Os contêineres do Docker envolvem um pedaço de software em um sistema de arquivos completo ao qual contém o necessário para executar: códigos, ferramentas do sistema, bibliotecas -- qualquer coisa que possa ser instalado em um servidor. Isso garante que o software sempre será executado da mesma forma, independentemente do seu ambiente."

Em outras palavras, o Docker permite você criar ambientes isolados de seu sistema raiz, através do uso de contêineres, de forma que fiquem independentes.

A instalação do Docker é feita de forma diferente em cada sistema operacional. Será apresentado os passos de como instalar em um sistema operacional Linux baseado em Debian (Debian-like) e, logo em seguida, o link para instalação nos demais sistemas.

## Instalação do Docker em um sistema operacional Linux baseado em Debian
A instalação é simples, basta inserir os seguintes comandos no terminal do seu linux:
```
# apt-get install curl
$ curl -fsSL https://get.docker.com/ | sh
```

Obs: O símbolo '#' diz que o comando deve ser executado com permissões de super-administrador (root), e o símbolo '$' diz que pode ser executado como usuário padrão do sistema.

Desta forma, sempre que for usar o Docker, terá que logar no sistema como root ou usar o 'sudo' antes de cada comando e isto não é muito prático. Para resolver é necessário adicionar o seu usuário do sistema ao grupo 'docker', que possui privilégios root, através do seguinte comando:
```
$ sudo usermod -aG docker $USER
```

Feito isto, é possível utilizar o comando 'docker' sem colocar 'sudo' antes, ou estar logado como root.

[Instalação do Docker nos demais sistemas operacionais (link para documentação oficial)](https://docs.docker.com/engine/installation/)

## Imagens Docker e Docker Hub
Para a criação de um contêiner Docker é necessário ter uma imagem base, ela pode ter sido criada por você ou ser baixada da central de imagens do Docker, o [Docker Hub](https://hub.docker.com/).

Atualmente existem milhares de imagens criadas e pré-configuradas para as mais diversas finalidades. Por exemplo: imagem com um servidor Apache ou DNS já instalados e prontos para serem colocados em funcionamento.

As imagens possuem uma nomenclatura padrão definida pela própria equipe de desenvolvimento:

```
nome_do_usuario/nome_da_imagem:versão
```

Exemplo:
```
danilopinotti/apache:2.4
```

Endereço para o Docker Hub: [https://hub.docker.com/](https://hub.docker.com/)

Ao encontrar uma imagem, é importante ler a documentação para ver como usá-la de maneira correta. Para ter uma cópia dela, ou de alguma versão específica, em sua máquina local basta digitar:
```
$ docker pull nome_imagem
$ docker pull nome_imagem:versão
```

## Comandos básicos
Ver versão do Docker instalada:
```
$ docker version
```

Ver as imagens disponíveis no Docker:
```
$ docker images
```

Ver todos os contêineres instanciados:
```
$ docker ps -a
```
O parâmetro '-a' faz com que exiba todos os contêineres instanciados. Sem ele, será mostrado apenas os contêineres em execução.

Executar/instanciar um contêiner (básico):
```
$ docker run -ti --name <nome_container> <nome_imagem>
```
Abaixo a explicação dos parâmetros do comando:

* `-ti`: permite assumir o bash do contêiner logo após instanciá-lo
* `-d`: Usado no lugar do '-ti'. instância e inicia o contêiner em background
* `--name <nome_container>`: permite dar um nome ao contêiner. Recomendável para que possa tratá-lo por um nome ao invés de seu ID sha1.
* `<nome_imagem>`: imagem de base para o contêiner.

Exemplo de uso:
```
$ docker run -ti --name meu_primeiro_container ubuntu:14.04
```

O Docker isola o ambiente dentro do contêiner de forma que não acesse nada da máquina hospedeira, em alguns casos isso complica na utilização deles. Por exemplo, os códigos da aplicação estão armazenados na máquina hospedeira, enquanto o ambiente de desenvolvimento está isolado no contêiner, para isso existem formas de "conversar" com a máquina hospedeira.

Uma forma é executar/instanciar um contêiner montando (ou _linkando_) uma pasta da máquina hospedeira para dentro do ambiente isolado:
```
$ docker run -v /home/pasta/host:/pasta/no/container --name <nome_container> <nome_imagem>
```

Outra é Executar/instanciar um contêiner redirecionando (ou linkando) uma porta da máquina hospedeira para o ambiente isolado:
```
$ docker run -p porta_host:porta_container --name <nome_container> <nome_imagem>
```

Além dessas formas apresentadas, existem outras mais complexas.

Para sair do contêiner é recomendado usar 'ctrl + p/q' para que, desta forma, não finalize ele.

Parar um contêiner (pode ser iniciado usando o seu ID sha1 ou o nome do contêiner):
```
$ docker stop <ID sha1 / nome_do_contêiner>
```

Iniciar um contêiner:
```
$ docker start <ID sha1 / nome_do_contêiner>
```

Executar um comando em um contêiner em execução. Para funcionar, o contêiner deve inicializado (started):
```
$ docker exec -it <nome_contêiner> /bin/bash
```
* '/bin/bash' será o comando executado dentro do contêiner

## Comandos úteis
Abaixo serão apresentados comandos úteis para a utilização do Docker.

### Remover contêineres
Um em específico:
```
$ docker rm -f <nome|id>
```

Todos:
```
$ docker rm -f $(docker ps -a -q)
```

### Remover imagem
Uma imagem específica:
```
$ docker rmi -f <nome_da_imagem>
```

Todas as imagens:
```
$ docker rmi $(docker images -q)
```

A maioria dos comandos apresentados nesta postagem possuem mais parâmetros que não foram abordados devida à complexidade que foi evitada. Em futuras postagens serão mostradas mais opções para utilização dos contêineres.

## Referências
[Blog pessoal de Ricardo Martins](https://www.ricardomartins.com.br/2014/09/11/docker-tutorial-mao-na-massa/)

[Documentação oficial Docker](https://docs.docker.com/)
