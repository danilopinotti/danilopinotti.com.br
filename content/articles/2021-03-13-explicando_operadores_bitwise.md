---
title: Explicando operações Bitwise
slug: explicando_operadores_bitwise
description: 'O objetivo deste artigo é explicar alguns dos principais operadores bitwise da forma em que finalmente consegui entendê-los, e mostrar o caminho que eu segui para conseguir esclarecê-los na minha mente.'
author:
  name: Danilo Pinotti
---

# Explicando operações Bitwise
## Introdução
Há tempos que eu tentava aprender operadores Bitwise, mas nunca consegui avançar nos estudos por não entende-los na sua **essência**.

Existem várias utilidades para operadores Bitwise. Algumas delas possibilita você ganhar desempenho nas suas aplicações e reduzir o espaço de armazenamento de informações, como, por exemplo, permissões em sistemas Unix em que, com apenas **3 bits**, é possível identificar se o usuário tem permissão de escrita, leitura e/ou execução.

Operadores Bitwise trabalham com **bits** (pois é) e, quando vemos os seus retornos em números decimais, podemos gerar confusões em nossas cabeças. Por exemplo:
```php
5 ^ 2   // 7
10 & 3  // 2
10 & 4  // 0
5 | 3   // 7
5 << 3  // 40
8 >> 3  // 1
```

**Atenção:** Os operadores bitwise são muito parecidos com os operadores condicionais das principais linguagens de programação, embora o seu funcionamento seja um pouco diferente.

O objetivo deste artigo é explicar alguns dos principais operadores bitwise da forma em que finalmente consegui entendê-los, e mostrar o caminho que eu segui para conseguir esclarecê-los na minha mente.

## Um pouco sobre bits e o sistema binário
Antes de explicar como os operadores bitwise funcionam, é importante que você saiba como trabalhar com números na base 2, também conhecido como números binários.

Um número com base 10 (decimal) significa que cada algarismo pode ir **de 0 até 9** (10 números), enquanto números binários, cada algarismo poderá ser **somente 0 ou 1**

Por exemplo:
```
Número decimal: 5
Número 5 binário: 101

Número decimal: 14
Número 14 binário: 1110
```

Se você não souber como fazer conversão de números decimais para binários, recomendo ler algum artigo sobre isso antes de prosseguir na leitura.

## Operadores
A seguir, explicarei cada um dos operadores mostrados na seção anterior e verá que não é tão complicado como parece.

Antes de prosseguirmos com a explicação, é necessário ter em mente que tudo tem a ver com **bits**, 0 e 1, logo, os operadores trabalham em cima de números binários.

### Operador "&" (bitwise AND)
Este operador compara dois bits e retorna **1** se **ambos os bits comparados forem 1**.

Exemplo:
```php
5 & 3  // 1

// 5 (decimal) = 101 (binário)
// 3 (decimal) = 011 (binário)

  101   // (decimal 5)
& 011   // (decimal 3)
= 001   // (decimal 1)
```

### Operador "|" (bitwise OR)
Este operador compara dois bits e retorna **1** se **um dos bits for 1**.

Exemplo:
```php
5 | 3  // 7

// 5 (decimal) = 101 (binário)
// 3 (decimal) = 011 (binário)

  101   // (5 decimal)
| 011   // (3 decimal)
= 111   // (7 decimal)
```
### Operador "^" (bitwise XOR)
Este operador compara dois bits e retorna **1** se **os bits comparados forem diferentes**.

Exemplo:
```php
5 ^ 3  // 6

// 5 (decimal) = 101 (binário)
// 3 (decimal) = 011 (binário)

  101   // (5 decimal)
^ 011   // (3 decimal)
= 110   // (6 decimal)
```
### Operador "<<" (bitwise left shift)
Com este operador, o número que está à direita representa a **quantidade de zeros** que serão adicionados à **direita** do número que se encontra à esquerda do operador.

Em outras palavras, na operação `5 << 3`, este operador **"adiciona 3 zeros"** à direita do número **5 binário**.

Exemplo:
```php
5 << 3  // 40

// 5 (decimal) = 101 (binário)

   101      // (5 decimal)
<<    000   // são adicionados 3 "zeros" à direita
 = 101000   // (40 decimal)
```

### Operador ">>" (bitwise right shift)
Neste operador, o número que está à direita representa a **quantidade de bits** que serão **removidos**, da direita para a esquerda, do número que se encontra à esquerda do operador.

Exemplo:
```php
14 >> 2  // 3

// 14 (decimal) = 1110 (binário)

   1110  // (14 decimal)
>>       // são removidos 2 bits da direita para a esquerda
 =   11  // (3 decimal)
```

## Conclusão
Dependendo da sua especialidade como programador, raramente precisará utilizar operadores bitwise, porém, ter conhecimentos sobre assuntos variados e tópicos base da programação, aumentam o seu “campo de visão” na hora de resolver problemas mais complexos.

Espero que este artigo tenha te ajudado de alguma maneira.

Até a próxima ;)

Encontrou algum erro e/ou quer contribuir com este artigo? Você pode submeter uma PR no seu [código fonte (Github)](https://github.com/danilopinotti/blog-posts/blob/master/2021-03-13-explicando_operadores_bitwise.md)  :)
