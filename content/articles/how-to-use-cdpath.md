---
title: How to make easy browse between frequent folders
description: When we are using a Linux terminal, we frequently are browsing between folders. This article will introduce a configuration that will facilitate browse between your most frequent folders.
publishedAt: 2022-02-28T21:00:00
author:
  name: Danilo Pinotti
---

# How to make easy browse between frequent folders

When I'm using a Linux terminal, I am often browsing between folders, but, I am frequently browsing between the same
folders.

I'm a Software Developer and I have a folder named "Development" containing all my software projects, e.g:

```
/home/danilopinotti/Development/blog
/home/danilopinotti/Development/project1
/home/danilopinotti/Development/project2
/home/danilopinotti/Development/github
/home/danilopinotti/Development/github/laravel-framework
```

Today, when I need to browse to one of these, I need to enter a command like:

```
cd ~/Development/blog
cd ~/Development/project1
```

These commands take a little time to write, once I need do type `cd ~/Doc` -> then <kbd class="kbd kbd-sm">tab</kbd> (for autocomplete) -> then type `blog` and press <kbd class="kbd kbd-sm">enter</kbd>.

Now, imagine if you could just type `cd blog` and then press <kbd class="kbd kbd-sm">enter</kbd>, whatever the folder
you are currently in, and you "magically" go to `/home/danilopinotti/Development/blog` folder.

It's possible (!) and now, I'll teach you how to do this introducing you to `cdpath`.
The `cdpath` allows you to register folders that you can use relative `cd` into any subfolder of the following paths.

To use, you need to append the follow code in `~/.bashrc` (or `~/.zshrc` if you are using zsh):
```
cdpath=(~/Development ~/Development/github)
```
Note: I use `~/Development` and `~/Development/github` because of my projects. You need to adapt these for your case. 

Now, when I type `cd laravel-framework` from any directory, I'll go to `/home/danilopinotti/Development/github/laravel-framework`, as well if I type `cd blog` I'll be redirected to `/home/danilopinotti/Development/blog`.

Tip: If you are using zsh, when you type `cd project` -> <kbd class="kbd kbd-sm">tab</kbd> -> <kbd class="kbd kbd-sm">tab</kbd>, you can use a nice autocomplete feature.
