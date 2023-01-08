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
      - [layoutEngine.js](#layout-engine)
      - [serverEngine.js](#server-engine)
      - [xmlManager.js](#xml-manager)
  - [main.js](#main-js)

     
   
    

### Manager Services

Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, o manager services define quais configurações deverão ser carregadas. Através das implementações programadas, a aplicação realiza a chamada do endpoint e as informações são carregadas e salvas de forma correspondente por intermédio do probrain engine.


### Probrain Base Engine

Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, o manager services define quais configurações deverão ser carregadas. Através das implementações programadas, a aplicação realiza a chamada do endpoint e as informações são carregadas e salvas de forma correspondente por intermédio do probrain engine.


### Diagrama de conexões

  <img src="" width="" />
  





