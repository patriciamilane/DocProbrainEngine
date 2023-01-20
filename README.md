# PROBRAIN ENGINE
<br>


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

Em usuários que não possuem um plano, ao finalizar a partida de um jogo freemium no portal, são exibidas propagandas do Afinando. Essas propagandas são exibidas atraves de css e html setados no arquivo adversitingEngine.js, do qual interagem com o JavaScript para ser exibido da forma e condição correta. 

A função ```loadAdversiting``` conversa com o servidor e obtem as informações que devem ser carregadas para o usuario e sua frequencia ???. 

```getFrequency``` recebe o tipo de usuário e seus parametros, a partir disso verificia sua permissão e retorna a frequencia??? ........

```processAdvertising``` verifica inicialmente se não é uma requisição da maratona. Ao verificar requisitos, a função acessa o localStorage a fim de verificar parametros existentes ao usuario


~~propagandas que aparecem nos jogos em usuários free~~

### Debugger Engine

### Form Suggestion Engine

### Html Engine

### Layout Engine

### Server Engine

O server Engine realiza toda a comunicação com o servidor através de endpoints. A partir dele, a aplicação consegue verificar os parametros e tokens necessários na sessão.

A comunicação dos plugins dos exports dos jogos é também feita através do serverEngine, além de todo salvamento de pontuação. 

A função ```getAllUrlParams``` recebe a url contendo parametros como id do usuário, dos jogos, nível, linguagem, a fim de popular o queryParam, que permite ao Probrain Engine mapear e executar diversas funcionalidades com base nesses parametros recebidos. 

A função ```onConfigurationLoadByJsons``` indica quando deve ser carregada as configurações dos  jogos pelo servidor. 

```isGoneUseJson``` verifica se a comunicação base do jogo será feita através de Json. 

```getJsonInfoString``` retorna as informações do usuários pelo servidor para a aplicação.

```SaveJsonConfiguration``` converte o json para string, recebe o token de ativo na sessão e salva as configurações do jogo no servidor. 

Na função ```loadJsonConfiguration``` ele carregará as configurações recebidas do jogo pelo servidor e verificará se deve deve ou não realizar o bloqueio dessa configuração a partir do objeto? ```blockConfiguration```, se não, será carregada pelo ```jsonLoaded```.

```jsonConfigurationInfo``` recebe as informações para carregar o json através do caminho inicializado em this.infoJson, e checa se a sessão do usuário é valida no server a partir da função ```checkUser```; Nessa função estão integradas as plataformas next e maratona. 

Para realizar a conversão da data e horário, é utilizada a função ```timeFormat``` para exibi-los conforme desejado. 

A função ```saveData``` recebe o objeto contendo o id do usuário, jogo e checa a sessão para realizar o salvamento de pontuação no servidor. 

```cacheUpdate``` verifica se há cache armazenado em localStorage e o reseta. 

```openLogginWindow``` tem como objetivo mostrar um modal para que seja possível o usuario logar caso sua sessão tenha expirado no momento de salvar a pontuação; essa verificação de sessão era realizada pela função ```check_child```. 

```addDataToSave``` funciona salvando a pontuação de forma dinâmica, que no godot por exemplo, conversa com a função save_score, onde estão todas as preferencias e informações relevantes do jogo selecionado, como configurações, seed, plays e demais propriedades. Essas propriedades são recebidas através do parametro tag, e caso uma tag nova seja criada, será tudo salvo dinamicamente dentro do json através do objectToSave, inicializado na função serverEngine().

Após a criação do json, o ```saveDataToServer``` fica responsável pelo salvamento dessas informações no servidor, além da conversão e organização das informações recebidas e salvas.  

```saveDataScript``` recebe as informações que foram salvas no servidor ?????

```loadData```...

### Xml Manager

O xmlManager trabalha principalmente com os arquivos xml dos jogos, fazendo o conversões e armazenamento das informações de jogada. 

A função ```parseXml``` é a responsável por retornar o xml formatado, facilitando seu acesso.

```getGameplay``` realiza o acesso ao Gameplay.xml do jogo.

```MaxLevelVerifyXML``` verifica o Max Level disponível no Gameplay.xml, ......

```getLanguage``` conversa com o servidor a fim de obter e armazenar o language.xml dos jogos.

```loadXML``` é a função que recebe o documento xml convertido (não utilizada). 


### Main 

### Probrain Config Json

Nele são encontradas as informações de configurações correspondente a cada aplicação (local, dev, homolog, prod) separados no formato json. A partir dele é possível definir os locais e endpoints correspondentes ao acesso de cada funcionalidade, permitindo de forma fácil e clara o acesso e manipulação dessas configurações.


### Probrain Config Json

### Vue Config js

A implementação do Probrain Engine foi desenvolvida com JavaScript para minimizar problemas de performance. Para compilar o código, é utilizado o Vue, a fim de permitir que o codigo seja modificado e facilmente interpretado pelo navegador. Um dos arquivos que se beneficia dessa compilação através do Vue, é o probrainengine.js, utilizado pelos jogos.


### Diagrama de conexões

  <img src="" width="" /> 
  





