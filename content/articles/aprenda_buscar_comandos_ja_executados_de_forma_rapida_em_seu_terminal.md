---
title: Aprenda a buscar comandos já executados de forma rápida em seu terminal (Linux e MacOS)
description: 'É comum, para usuários que preferem utilizar o terminal para agilizar determinados processos, ter que digitar novamente algum comando que já foi executado.'
publishedAt: 2018-03-30T21:00:00
author:
  name: Danilo Pinotti
---
# Aprenda a buscar comandos já executados de forma rápida em seu terminal (Linux e MacOS)
![Busca no terminal](https://github.com/danilopinotti/blog-posts/raw/master/assets/terminal-search.png "Busca no terminal")

É comum, para usuários que preferem utilizar o terminal para agilizar determinados processos, ter que digitar novamente algum comando que já foi executado.

Quando este comando foi executado há pouco tempo, é fácil encontrá-lo novamente apenas apertando a tecla ‘setinha para cima’ repetidas vezes, porém, isso se torna inviável quando o comando foi executado há algum tempo e existem vários outros comandos executados posteriormente.

A dica que lhes trago nesta postagem é sobre a utilização da busca presente nos terminais Linux (também testado no MacOS).

Para utilizá-la, basta apertar **Ctrl + R** e começar a escrever uma parte do comando que deseja encontrar. Caso a primeira busca não retorne o comando que você deseja, basta apertar Ctrl + R repetidamente até encontrá-lo. Caso queira executar imediatamente, aperte **Enter**.

Para cancelar a busca, basta apertar **Ctrl + C**.

Você também pode ver a lista de todos os comandos já executados. Para isso, insira o seguinte comando no terminal e aperte **Enter**:
```
$ history
```

Espero que esta postagem ajudem vocês.

Até mais ;)
