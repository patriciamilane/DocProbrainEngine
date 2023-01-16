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

A compilação abrirá o gerenciador de projetos do vue, que permite, de maneira visual, realizar processos sem utilizar comandos padrão. 

## Dependencias

- public
  - gameplay.xml
  - index.html
- src
   - [engines](#engines)
      - [ManagerServices.js](#manager-services)
      - probrain-base-engine.js
   - [services](#services)
      - [advertisingEngine.js](#advertising-engine)
      - [debuggerEngine.js](#debugger-engine)
      - [formSuggestionEngine.js](#form-suggestion-engine)
      - [htmlEngine.js](#html-engine)
      - [layoutEngine.js](#layout-engine)
      - [serverEngine.js](#server-engine)
      - [xmlManager.js](#xml-manager)
  - [main.js](#main-js)
  - [probrain_config.json](#probrain-config-json)
- [vue.config.js](#vue-config-js)

     
   
## Engines    

### Manager Services

  Os jogos desenvolvidos compoem diversas aplicações da empresa, devido a isso, o manager services define quais configurações deverão ser carregadas. Assim, realiza a chamada do endpoint e as informações são carregadas e salvas de forma correspondente por intermédio do probrain engine.
  
  O Manager Services se conecta aos [serviços](#services) implementados e envia parametros de autenticação, permitindo então a validação e execução das funções desses serviços. 
       
  O objeto `ruleConfig` instancia a url das aplicações para permitir a identificação do local que o usuário está acessando. O `jsonConfig` permite a comunicação com o probrain_config.json, pois é onde as informações de configuração estão salvas.
  

## Services

### Advertising Engine

~~propagandas que aparecem nos jogos em usuários free~~

### Debugger Engine

### Form Suggestion Engine

### Html Engine

### Layout Engine

### Server Engine

O server Engine realiza toda a comunicação com o servidor através de endpoints. A partir dele, a aplicação consegue verificar os parametros e tokens necessários na sessão.

A comunicação dos plugins dos exports dos jogos é também feita através do serverEngine, além de todo salvamento de pontuação. 

A função ```onConfigurationLoadByJsons``` indica quando deve ser carregada as configurações dos  jogos pelo servidor. ```isGoneUseJson``` verifica se a comunicação base do jogo será feita através de Json. ```getJsonInfoString``` retorna as informações do servidor para a aplicação. ```SaveJsonConfiguration```


### Xml Manager


### Main 

### Probrain Config Json

Nele são encontradas as informações de configurações correspondente a cada aplicação (local, dev, homolog, prod) separados no formato json. A partir dele é possível definir os locais e endpoints correspondentes ao acesso de cada funcionalidade, permitindo de forma fácil e clara o acesso e manipulação dessas configurações.


### Probrain Config Json

### Vue Config js

A implementação do Probrain Engine foi desenvolvida com JavaScript para minimizar problemas de performance. Para compilar o código, é utilizado o Vue, a fim de permitir que o codigo seja modificado e facilmente interpretado pelo navegador. Um dos arquivos que se beneficia dessa compilação através do Vue, é o probrainengine.js, utilizado pelos jogos.


### Diagrama de conexões

  <img src="" width="" /> 
  





