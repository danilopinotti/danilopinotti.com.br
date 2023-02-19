---
title: O Básico Sobre Expressões Regulares
description: 'Expressão regular é uma forma de representar palavras, frases ou até parágrafos através de uma única notação. A aplicação de expressões regulares é praticamente infinita, basta encontrar os momentos certos para usá-las.'
image: /images/articles/regex.jpeg
publishedAt: 2017-02-06T21:00:00
keywords: regex, expressões regulares, regex 101, aprendendo regex
tags: regex, expressões regulares
author:
  name: Danilo Pinotti
---

# O Básico Sobre Expressões Regulares
O que são? Pra que servem? Podem mesmo me ajudar?

![Regex](/images/articles/regex.jpeg "Expressões Regulares")

## O que são?

Expressão regular é uma forma de representar palavras, frases ou até parágrafos através de uma única notação. Ainda não entendeu? Vamos a alguns exemplos:

* Imagine no desenvolvimento de um sistema ao qual é repleto em validações em textos. Como será validado um campo de e-mail, por exemplo? Percorrerá caractere por caractere a fim de buscar os padrões de um campo de e-mail ?
* Imagine na escrita de um texto ao qual você quer buscar todas as palavras escritas duas vezes seguidas, exemplo “Usar expressões regulares **para para** resolver (…)”. Além de buscá-las você também quer arrumá-las automaticamente.
* Substituir todas as ocorrências da palavra ‘carro’ por ‘automóvel’.

A aplicação de expressões regulares é praticamente infinita, basta encontrar os momentos certos para usá-las.

## Conceitos básicos

Antes de começar a explicar como criar e ler uma expressão regular, é importante ter em mente o significado da palavra match. A tradução literal da palavra é “corresponder’” porém, neste contexto, a palavra será utilizada para dizer que uma expressão regular “casou” com uma palavra, frase ou parágrafo, ou seja, quando uma expressão regular conseguir representar o que foi planejado.

Outra ideia que deve sempre estar em mente é que uma expressão regular é lida como uma palavra onde cada parte dela representa, inicialmente, apenas um caractere. Mais para frente, neste artigo, será mostrado isso.

Uma expressão regular é formada de vários metacaracteres e caracteres literais. São chamados metacaracteres os caracteres que servem para representarem outros caracteres, neste artigo não serão explicados todos. São eles: `. ? * + ^ $ | [ ] { } ( ) \`

Para tornar um metacaractere um caractere literal, usa-se o escape (\). Por exemplo, para usar o ponto como caractere literal: \.

Um exemplo simples de expressão regular:
```regexp
[0-9]{5}-[0-9]{3}
```

A expressão acima foi escrita para “casar” com um CEP (código de endereçamento postal) onde possui 5 dígitos numéricos, um traço e logo após, mais 3 dígitos numéricos.

![Exemplo de REGEX](/images/articles/regex-1.png "Exemplo de regex")

## Componentes básicos

Nesta parte do artigo serão explicados separadamente alguns dos componentes que formam uma expressão regular.

Existem ferramentas online para testar, em tempo real, as expressões regulares criadas. É interessante você acompanhar a leitura do artigo e ir fazendo seus próprios testes. Uma ferramenta interessante é o [regex101](https://regex101.com/).

### Lista [ ... ]

A lista é um dos componentes mais utilizados. Ela permite você escolher quais caracteres poderão aparecer no lugar em que ela foi colocada. Exemplo:
```regexp
[ab]c
```

Neste caso, a expressão regular casará com as seguintes informações:
```text
ac
bc
```

Uma lista representa apenas um caractere.

Dentro da lista todos os caracteres são literais, com exceção do traço (-), do acento circunflexo (^) e, caso não seja o primeiro ítem da lista, o colchete de fechar (]).

É possível utilizar um conjunto de dados dentro da listas, desta forma, facilitando filtrar caracteres. Exemplo:
```regexp
[0-2]c
```

Que casará com:
```text
0c
1c
2c
```

Como conjuntos dentro de listas você pode utilizar:
```
a-z
A-Z
A-z
0-9
```

### Lista negada [^ … ]

A lista negada têm a mesma finalidade da lista comum, porêm, os caracteres dentro dela são ignorados no momento de casar. A lista negada é uma lista convencional a qual o primeiro ítem é o circunflexo: [^ … ]. Em outras palavras, ela permite representar qualquer outro caractere, exceto os que estão dentro dela.

Exemplos de utilização:
```regexp
pat[^a]
```

A expressão regular acima consegue se casar com a palavra ‘pato’ porém, não consegue se casar com ‘pata’ por causa da lista negada que “proíbe” o aparecimento a letra “a” no final da palavra.

### Ponto .

O ponto ( . ) é um metacaractere que se casa com qualquer outro caractere, ou seja, ele é um curinga.

Exemplos de utilização:
```regexp
.[a-z]
```

A expressão regular acima se casa com qualquer conjunto ao qual começa com qualquer caractere e, em seguida, uma letra minúscula:
```text
1a, rb, (z, pw, 8z, etc.
```

### Metacaracteres quantificadores

Pense que agora que você já fez a lista de caracteres desejados, você quer buscar todas as palavras que começam com eles. Você pode fazer de algumas formas.

#### Primeira forma: Limitar a quantidade exata de vezes que aquele elemento aparecerá ####

Tendo uma lista com os elementos escolhidos, você pode escolher quantas vezes ela poderá se repetir com a utilização do metacaractere de chaves ( {} ) com a quantidade de vezes que o elemento anterior poderá se repetir, ou seja: [a-b]{3} é o mesmo que [a-b][a-b][a-b]

Utilização:
```regexp
[a-b]{2}
```
Neste caso “falamos” que a expressão regular se casará com qualquer palavra/termo de duas letras em que cada uma poderá ser ‘a’ ou ‘b’.

Outro exemplo:
```regexp
[a-z]{5}
```

Neste segundo caso podemos dizer que a expressão regular irá casar com qualquer palavra, toda minúscula, de 5 letras.

#### Segunda forma: Definir um limite mínimo e máximo de vezes que o elemento poderá aparecer ####
Semelhante ao primeiro caso, esta limitação é feita usando os metacaracteres de chaves, porém, com dois valores dentro que representam, respectivamente, valor mínimo e valor máximo.

Utilização
```regexp
[a-z]{3,5}
```

No exemplo acima, a expressão regular casará com qualquer palavra, toda minúscula, de 3 até 5 letras.

##### Metacaractere: ? #####

Este metacaractere permite tornar opcional a ocorrência do elemento ao seu lado, ou seja: 
`[a-z]?` é o equivalente a: `[a-z]{0,1}`

#### Terceira forma: Não limitar a quantidade de vezes que ele poderá aparecer ####

Para isso podemos utilizar dois metacaracteres diferentes, o asterisco (*) e o mais (+).

A diferença é simples, o asterisco permite casar o elemento nenhuma vez ou infinitas vezes, enquanto o (+) permite casar o elemento pelo menos uma vez ou infinitas vezes.
Exemplos:
```regexp
[a-z]*
```

Permite casar qualquer palavra minúscula ou nenhuma palavra.
```regexp
[a-z]+
```

Permite casar uma única letra ou qualquer palavra minúscula.

### Âncoras

Metacaracteres chamados de âncoras são aqueles que permite você “posicionar” sua expressão regular, indicando início ou fim de linhas e parágrafos:

São eles:

* ^ : Circunflexo. Indica o início de uma linha
* $ : Cifrão. Indica o final de uma linha
* \b : Borda. Indica as bordas de uma palavra, ou seja, início ou fim de uma palavra.

Exemplos de uso:
```regexp
^hoje$
```

Se casará apenas com a linha que só tenha a palavra “hoje”.
```regexp
^hoje o \b[A-Za-z]+\b estará maravilhoso$
```

Se casará com qualquer uma das linhas abaixo:
```text
hoje o dia estará maravilhoso
hoje o sol estará maravilhoso
hoje o (qualquer termo sem espaços aqui) estará maravilhoso
```

## Aplicações gerais

Como dito no início do artigo, a aplicação de expressões regulares tende ao infinito. Você consegue, além de abrir o leque de opções em suas buscas, usá-las em validações e substituições (não explicado no artigo). Abaixo mais alguns exemplos de utilização:

```regexp
\([0-9]{2}\)[0-9]?[0-9]{4}-[0-9]{4}
```
Casará com números de telefone que contenham o DDD de dois dígitos numéricos e possuam ou não o nono dígito: (99)98888–8888 ou (99)8888–8888
```regexp
[a-z0-9_]+@[a-z0-9]+(\.[a-z0-9]+)+
```
Casará com emails.
Entre outras…

## Conclusão
A partir do momento em que você aprender como usar expressões regulares e ver as aplicações, verá o quanto irá facilitar em atividades do dia-a-dia, principalmente para quem é da área de informática.

No meu caso, enquanto escrevia minha monografia da faculdade, consegui identificar vários deslizes de escrita como: palavras escritas duas vezes, parágrafo iniciando com letra minúscula, falta de espaço depois da vírgula, etc.

O seguinte livro, que será deixado como referência, possui vários exemplos de aplicações de expressões regulares.

## Referências

Apesar de existirem diversos lugares que ensinam a usar expressões regulares irei indicar o lugar em que aprendi, onde está explicado de forma simples e divertida.

Livro: [Expressões Regulares: Uma abordagem divertida](https://books.google.com.br/books?id=MNCCCwAAQBAJ&hl=pt-BR&source=gbs_navlinks_s)

Endereço eletrônico: http://aurelio.net/regex/guia/
