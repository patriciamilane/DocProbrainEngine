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

 

### Vue Config js

A implementação do Probrain Engine foi desenvolvida com JavaScript para minimizar problemas de performance. Para compilar o código, é utilizado o Vue, a fim de permitir que o codigo seja modificado e facilmente interpretado pelo navegador. Um dos arquivos que se beneficia dessa compilação através do Vue, é o probrainengine.js, utilizado pelos jogos.

### Probrain Config Json

Nele são encontradas as informações de configurações correspondente a cada aplicação (local, dev, homolog, prod) separados no formato json. A partir dele é possível definir os locais e endpoints correspondentes ao acesso de cada funcionalidade, permitindo de forma fácil e clara o acesso e manipulação dessas configurações.

Para todas as features a serem introdudas na aplicação, é necessario adicionar a configuração em probrain_config.json e adicionar no server para ser incluído.
   
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

```processAdvertising``` verifica inicialmente se não é uma requisição da maratona. Ao verificar requisitos, a função acessa o localStorage a fim de obter os parametros existentes ao usuario, como id do login. Também armazena informações armazenadas em cache relacionados a frequencia ??? das exibições, e processa a função que mostras a propagandas???.

```showAdvertising``` exibe por fim o modal responsavel por transmitir a propaganda.

### Debugger Engine

```getVersion``` retorna a versão da aplicação rodada, essa versão é obtida com a verificação da privateKey através do managerServices.js.

```log``` é a função que verifica se os parametros recebidos não estão vazios e reescreve os erros apresentados pelo jogo no navegador.

```call_dinamic_method``` ???? arguments

```saveLog``` recebe o parametro console e verifica se existem informações no navegador e realiza a conversão dessas informações através do metodo stringify caso sejam um objeto. A função tambem tem como objetivo simular o click do mouse na aplicação. A conversão de formato de data e hora é realizada nessa função, a fim de salvar os logs recebidos em um arquivo e manter suas informações legíveis.


### Html Engine

Nesse arquivo, códigos em html são setados e carregados, a fim de definir como o conteudo será exibido na tela.

```removeCanvas``` ???

```loadStyle``` está recebendo o css por parametro e definindo como será sua exibição no documento. o Css recebido é setado em formSuggestionEngine.

```addLinkCSSHead``` nesta função, a linkagem do arquivo css é setado dentro do documento. Também é utilizado para se conectar a fontes do google e outras Apis.


```addModal``` recebe os parametros nome e o conteúdo que deverá ser exibido e determina suas demais configurações de exibição por meio de html. Um de seus usos é na função que carrega propagandas em usuários free, neste caso, o html embutido permitirá que a propaganda seja carregada com os tamanhos e design desejados.

```cleanMethods``` -- função vazia.

```showModal``` define qual modal deverá ser exibido com base em seu index. Na aplicação ele chamado para exibir os modais como de propaganda e do formulário de sugestões.

```loadHtml``` recebe o html setado em formSuggestion.js como parametro, e o carrega para que seja exibido. É utilizado principalmente na função principal do documento, e no layoutEngine.


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

### Form Suggestion Engine

Seu objetivo é exibir o formulário de sugestão existente nos jogos e receber os feedbacks submetidos pelos usuários. Nele é setado o html para definir a aparencia que o formulário deve ter e um objeto de tradução dos textos presentes nele.

```initFormStyle``` se conecta as fontes do google e carrega o css do formulário.

```translate``` recebe a linguagem que deverá ser exibido o formulário, se essa linguagem for falsa, será setado para o padrão pt_br.

```initFormHTML``` recebe o html setado no documento e mapeia os textos de acordo com a linguagem recebida e mapeia a interação do usuario com o submit do formulário.

```submitForm``` salva as informações do usuário, mensagem de feedback, jogo, jogadas e informações das configurações e o envia ao servidor. Também é verificado se o email preenchido é válido para que o feedback seja enviado com sucesso.

```setFeedbackForm``` recebe o tipo e conteudo do feedback enviado.

```showForm``` exibe o modal com o formulário do feedback.


### Layout Engine

```redirectFailure``` função que redireciona o usuário para outro local caso não consiga identificar o recebimento de algum parametro necessário para executar a tarefa acessada.


```getBlockLevel``` bloqueia os níveis do jogo de serem acessados. A função verifica o xml do jogo e identifica se está habilitado para bloquear determinado nível ou não, dependendo da lógica recebida pelo servidor.


```correctCountUpdate```


```layoutEngine```

```maxLevel``` retorna o Max Level contido no xml. Sua identificação é feita através da tag <levelN>.

```updateLanguage```
```layoutUpdate```
```ErrorCountUpdate```
```roundUpdate```
```redirectClose```
```getConfigurationBlockLevel```
  
```getMemoryType``` retorna os áudios contidos no arquivo ??? do jogo.

### Main 



### Diagrama de conexões

  <img src="" width="" /> 
  





