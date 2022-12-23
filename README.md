# PROBRAIN ENGINE

ProbrainEngine é uma implementação que permite intermeditar comunicações com o servidor. Através dele é possível receber sinais e mapear todos os eventos envolvendo o usuario como suas permissões, jogadas, pontuações, além de controlar todas as instancias dos jogos.

### Instalação

```
npm install -g @vue/cli
```

### Compilação
```
vue ui
```

A compilação abrirá o gerenciador de projetos do vue, que permite, de maneira visual, realizar processos sem utilizar os comandos padrão. 

### Dependencias
.......

.......
#### ManagerServices.js

Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, o manager services define quais configurações deverão ser carregadas. Através das implementações programadas, a aplicação realiza a chamada do endpoint e as informações são carregadas e salvas de forma correspondente por intermédio do probrain engine.

### Diagrama de diretorios

  <img src="https://github.com/patriciamilane/DocProbrainEngine/blob/main/img/Screenshot_1.png" width="650" />
  
  ### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





