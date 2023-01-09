# PROBRAIN ENGINE

ProbrainEngine é uma implementação que permite intermeditar comunicações com o servidor. Através dele é possível receber sinais e mapear todos os eventos envolvendo o usuario como suas permissões, jogadas, pontuações, além de controlar todas as instancias dos jogos.

## Instalação

```
npm install -g @vue/cli
```

## Compilação
```
vue ui
```

A compilação abrirá o gerenciador de projetos do vue, que permite, de maneira visual, realizar processos sem utilizar os comandos padrão. 

## Dependencias

- public
  - gameplay.xml
  - index.html
- src
   - [engines](#engines)
      - [ManagerServices.js](#manager-services)
      - [probrain-base-engine.js](#probrain-base-engine)
   - [services](#services)
      - [advertisingEngine.js](#advertising-engine)
      - [debuggerEngine.js](#debugger-engine)
      - [formSuggestionEngine.js](#form-suggestion-engine)
      - [htmlEngine.js](#html-engine)
      - [layoutEngine.js](#layout-engine)
      - [serverEngine.js](#server-engine)
      - [xmlManager.js](#xml-manager)
  - [main.js](#main-js)
- [vue.config.js](#vue-config-js)

     
   
    

### Manager Services

  Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, o manager services define quais configurações deverão ser carregadas. Através das implementações programadas, a aplicação realiza a chamada do endpoint e as informações são carregadas e salvas de forma correspondente por intermédio do probrain engine.
  
  O objeto `ruleConfig` instancia a url das aplicações para permitir a identificação do local que o usuário está acessando, e a partir disso, . 
  O `jsonConfig` permite a comunicação com o probrain_config.json, pois é onde as informações de configuração estão salvas, 


### Probrain Base Engine

Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, 

### Form Suggestion Engine

### Server Engine

kkk


### Probrain Config Json

Nele são encontradas as informações de configurações correspondente a cada aplicação (local, dev, prod) separados no formato json. A partir dele é possível definir os locais e endpoints correspondentes ao acesso de cada funcionalidade, permitindo de forma fácil e clara o acesso e manipulação dessas configurações.


### Vue Config js

A implementação do Probrain Engine foi desenvolvida com JavaScript para minimizar problemas de performance. Para compilar o código, é utilizado o Vue, a fim de permitir que o codigo seja modificado e facilmente interpretado pelo navegador. Um dos arquivos que se beneficia dessa compilação através do Vue, é o probrainengine.js, utilizado pelos jogos.


### Diagrama de conexões

  <img src="" width="" /> 
  





