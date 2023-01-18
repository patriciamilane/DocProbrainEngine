let axios = require("axios");
/* const _server_client = axios.create({
	headers: {
		'cache': false,
		'Content-Type': 'application/json'
	}
})
 */

function serverEngine() {
  // JSON
  this.blockConfiguration = false; // Deterina se haverá bloqueio de Configuration Geral.
  this.jsonLoaded = "";
  this.objectToSave = {};
  this.axios = axios;
  Object.freeze(this.axios);
  this._server_client = this.axios.create({
    headers: {
      cache: false
    }
  });
  this.infoJson = {
    path: "Configuration", // Caminho para acessar a configuração do json.
    indexOnConfiguration: 1
  }; // Indice que representa o id a ser carregado na configuração.

  //Token
  this.tokenAuth = "EXEMPLOTOKENTOSAVEDATA"; // Representa o token ativo na sessão

  this.folder = "";
  this.queryParam = [];

  //Load
  this.jsonServerInfo = {}; // dados de usuarios
  this.jsonServerInfoDynamic = {}; // Recebe dados retornados da checagem de sessão

  //this.forceSession = true;		// faz request para o server a cada 2 minutos

  this.userAuth = false; // Indica se o usuário está autenticado

  this.levelCheck = url_parameters["nivel"];

  this.pontuation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (this.levelCheck != "" && this.levelCheck != undefined) {
    if (this.levelCheck.indexOf(",") > -1 && this.levelCheck != "0") {
      this.pontuation = url_parameters["nivel"].split(",").map(function(i) {
        return parseInt(i, 10);
      });
    } else {
      if (this.levelCheck != "0") {
        if (isNaN(this.levelCheck)) {
          this.pontuation = [1];
          this.blockLevelType = 1;
        } else {
          this.pontuation = [parseInt(this.levelCheck)];
        }
      }
    }
  }
  this.folder = window.location.pathname.split("/");

  this.queryParam["id_stage_triagem"] = url_parameters["id_stage_triagem"];
  this.queryParam["token"] = url_parameters["token"];
  this.queryParam["user_token"] = url_parameters["user_token"];
  this.queryParam["label_user_uid"] = url_parameters["label_user_uid"];
  this.queryParam["plataforma"] = url_parameters["plataforma"];
  this.queryParam["tipo_jogo"] = url_parameters["tipo_jogo"];
  this.queryParam["id_usuario"] = url_parameters["id_usuario"];

  if (this.queryParam["id_usuario"] == null)
    this.queryParam["id_usuario"] = url_parameters["id_usu"];
  
  if (this.queryParam["gpi"])
    this.queryParam["gpi"] = url_parameters["gpi"];
  
  if (this.queryParam["id_usuario"] == null)
    this.queryParam["id_usuario"] = url_parameters["id_paciente"];
  
  Object.freeze(this.queryParam["id_usuario"]);
  this.queryParam["id_jogo"] = url_parameters["id_jogo"];
  Object.freeze(this.queryParam["id_jogo"]);
  this.queryParam["mode"] = url_parameters["mode"];
  this.queryParam["params"] = url_parameters;
  this.queryParam["http_reffer"] = document.referrer;

  this.next_plataform = url_parameters["next"] == "1";
  this.is_marathon_request = url_parameters["maratona"] == "1"
  this.API =
    url_parameters["mode"] == "API" || url_parameters["mode"] == "api"
      ? true
      : false;
  Object.freeze(this.API);

  /*if(this.queryParam["http_reffer"]==""){
		console.log("document.referrer is empty");
		//self.redirectFailure();
		this.id_usuario = 23;
		this.queryParam["http_reffer"] = "http://localhost/jogos_dev";
		this.queryParam["vendor"] = 2;
		this.queryParam["vendor_id"] = 22;
		this.queryParam["id_jogo"] = 1;
		this.queryParam["tipo_jogo"] = 1;
		this.queryParam["token"] = "AUHDPASHD";
		this.queryParam["id_stage_triagem"] = 1;
	}//*/

  this.tokenAuth = this.queryParam["token"];


  //console.log(this.tokenAuth);
  /* 	if (jsLoaded > 4 && Object.keys(this.jsonServerInfo).length == 0)
			this.loadData(); */
  /* if (this.forceSession && !this.API) {

  } */
  
  //this.cacheUpdate();
}

var url_parameters = getAllUrlParams();

var id_game = url_parameters["id_game"];
var id_user = url_parameters["id_usu"];

function getAllUrlParams(url) {
  if (url == undefined) url = window.location.toString();
  // get query string from url (optional) or window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split("=");

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // (optional) keep case consistent
     
      paramName = paramName.toLowerCase();
      if (typeof paramValue === "string" && paramName != "user_token") paramValue = paramValue.toLowerCase();
      
      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, "");
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === "string") {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
//Cache MAnager
//document.lastModified
serverEngine.prototype.cacheUpdate = function() {
  var date_cache = new Date(parseInt(localStorage.getItem(location.pathname))).getTime();
  var date_document = new Date(document.lastModified).getTime();

  if(isNaN(date_cache)){
    localStorage.setItem(location.pathname,date_document);
  }else if( date_document - date_cache  != 0){
    console.log("cache reset " + date_document);
    localStorage.setItem(location.pathname,date_document);
    location.reload(true);
  }
};

//JSON

//Verifica se pode carregar a configuração do jogo pelo servidor.
//Aqui indica (quando) se deve carregar as configurações do server.
serverEngine.prototype.onConfigurationLoadByJsons = function() {
  var returnCase =
    (this.currentLayout === "GameplayScreen" ||
      this.currentLayout === "TitleScreen") &&
    this.is_configuration_master_use_json;
  this.log("Load Json Configuration? " + returnCase);
  return returnCase;
};

//Verifica se o jogo terá sua comunicação base por json.
serverEngine.prototype.isGoneUseJson = function() {
  this.log("Use Json? " + this.is_configuration_master_use_json);
  return this.is_configuration_master_use_json;
};

//Retorna json server para a aplicativo
serverEngine.prototype.getJsonInfoString = function() {
  //console.log(JSON.stringify(this.jsonServerInfo));

  return JSON.stringify(this.jsonServerInfo);
};

//Salva as configuração do jogo para o servidor.
serverEngine.prototype.SaveJsonConfiguration = function(jsonString) {
  this.log("***");
  this.log("JSON SAVED");
  var jsonToSave = JSON.parse(jsonString);
  /*   if (this.is_enable_feedback)
    this.feedbackCommunicar.updateScoreGameplay(
      jsonToSave.level,
      jsonToSave.score,
      jsonToSave.time
    ); */
  if (this.is_use_token) jsonToSave["token"] = this.tokenAuth;
  //this.log(jsonToSave);
};

//Carrega as configurações do jogo pelo servidor.
serverEngine.prototype.loadJsonConfiguration = function(currentLevel) {
  // Nesta parte ele receberá configurações do servidor.
  // E uma delas representará se this.blockConfiguration irá bloquear as configurações.
  // Example
  if (currentLevel === 0) {
    // GERAL
    // Aqui que receberá os dados do servidor para o bloqueio ou não da configuração.
    this.blockConfiguration = false;

    this.jsonLoaded =
      '{"user_id":"teste","game_id":"1","level":' +
      0 +
      ',"score":0,"time":"00:00","Configuration":[["",2,""],["Controle de Intervalo",1,"0.1"],["Controle de Duração",2,"0.4"],["Controle de Balanço",2,"0"],["Controle de Volume",4,"-15"],["Controle de Balanço",2,"0"],["Controle de Volume",5,"-15"],["Músicas",1,"bgm"],["Controle de Balanço",2,"0"],["Controle de Volume",1,"-50000"],["Sons Competitivos",1,"bgs"]]}';
    this.log("Loaded Generic Configuration");
  } else {
    // Por nivel
    // Aqui que receberá os dados do servidor para o bloqueio ou não da configuração.
    this.blockConfiguration = false;
    this.log("Loaded Configuration");
    this.jsonLoaded =
      '{"user_id":"teste","game_id":"1","level":' +
      currentLevel +
      ',"score":0,"time":"00:00","Configuration":[["",2,""],["Controle de Intervalo",' +
      currentLevel +
      ',"0.1"],["Controle de Duração",2,"0.4"],["Controle de Balanço",2,"0"],["Controle de Volume",1,"-15"],["Controle de Balanço",2,"0"],["Controle de Volume",5,"-15"],["Músicas",1,"bgm"],["Controle de Balanço",2,"0"],["Controle de Volume",1,"-50000"],["Sons Competitivos",1,"bgs"]]}';
  }
  // Example
  return this.jsonLoaded;
};
//Pega as informações para carregar o json.
serverEngine.prototype.jsonConfigurationInfo = function() {
  this.log("Get Json Info");
  return this.infoJson;
};

// GET
// Checa se o usuário é válido no server.
serverEngine.prototype.checkUser = function() {
  if (this.next_plataform || this.is_marathon_request) {
    console.log("next plataform " + urlToCheck);
    return;
  }

  var self = this;
  var urlToCheck = self.url_check_user;
  var path = window.location.pathname.split("/");
  path.pop();
  var dataToSave = "";
  var _method = "GET";

  self.game_name = path.pop();
  if (self.API) {
    const formUrlEncoded = x =>
      Object.keys(x).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        ""
      );

    _method = "POST";
    dataToSave = {};

    dataToSave["token"] = self.queryParam["token"];
    dataToSave["id_paciente"] = self.queryParam["id_usuario"];
    dataToSave["id_jogo"] = self.queryParam["id_jogo"];
    dataToSave = formUrlEncoded(dataToSave).slice(1);
    urlToCheck = self.url_check_user_api;
  } else {
    urlToCheck =
      urlToCheck +
      "?id_usuario=" +
      self.queryParam["id_usuario"] +
      "&jogo=" +
      self.game_name;
  }
  console.log("check user " + urlToCheck);

  return self
    ._server_client({ url: urlToCheck, method: _method, data: dataToSave })
    .then(response => {
      if (!self.API && response.data == "OK") {
        return 1;
      }
      if (!self.API) {
        self.log("failure to check session");
        self.redirectFailure();
      }
      self.jsonServerInfoDynamic = response.data;
      // self.jsonServerInfoDynamic = JSON.parse(response);
    })
    .catch(e => {
      self.log(e);
      self.log("failure to check session");
    });
};

serverEngine.prototype.timeFormat = function(timeString) {
  console.log("timeFormat");
  console.log(timeString);
  var _timeString = timeString.replace(" ", "");
  var time = _timeString.split(":");
  var returnTime = "";
  for (var i = 0; i < time.length; i++) {
    if (time[i].length < 2) {
      time[i] = "0" + time[i];
    }
    returnTime = returnTime + time[i] + ":";
  }
  return returnTime.slice(0, -1);
};
// Função de salvamento de pontuação no servidor.
serverEngine.prototype.saveData = function(dataToSave) {
  if (!this.API && !this.next_plataform && !this.is_marathon_request) { // 2.0
    let self = this;

    var get_url = "?id_usuario=" + self.queryParam["id_usuario"];
    get_url = get_url + "&jogo=" + self.game_name;
    var urlToCheck = self.url_check_user;
    urlToCheck = urlToCheck + get_url;

    console.log(urlToCheck);
    return self._server_client({ url: urlToCheck, method: "GET" }).then(response => {
      //console.log("try update sess");
      if (response.data != "OK"){
        ///console.log("deslogged");
        let semx = {};
        let timer = {};
        function openLogginWindow() {
          alert(
            "Sua sessão do portal expirou, por favor clique em OK, para logar novamente."
          );

          semx = window.open(
            self.url_website + "painel/login",
            "login",
            "toolbar=no,location=no,status=no,resizable=no,scrollbars=no,menubar=no,copyhistory=no,fullscreen=0"
          );

          semx.focus();
          semx.moveTo(window.innerWidth / 2 - 300, 0);
          semx.resizeTo(600, window.innerHeight / 2);

          timer = setInterval(check_child, 700);
        }

        function check_child() {
          if (
            semx.location.pathname == "/painel" ||
            semx.location.pathname == "/painel/" ||
            semx.location.pathname == "/painel/jogos"
          ) {
            clearInterval(timer);
            self.saveDataToServer(dataToSave, true);
            // alert("Pronto agora você já pode continuar o jogo.")
            semx.close();
          } else if (semx.closed) {
            clearInterval(timer);
            openLogginWindow();
          } else {
            semx.scrollTo(0, 400);
          }
          //console.log("check child");
        }
        window.addEventListener("beforeunload", function(e) {
          semx.close();
        });
        openLogginWindow();
      } else {
        self.saveDataToServer(dataToSave);
      }
    });
  } else {
    this.saveDataToServer(dataToSave);
  }
};

serverEngine.prototype.addDataToSave = function(tag, _data_object) {
  console.log("Add to objectToSave")
  console.log(tag)
  console.log(_data_object)
  var data_to_save = _data_object;
  if (typeof data_to_save == "string") {
    if (data_to_save.includes("{")) {
      data_to_save = JSON.parse(data_to_save);
    }
  }
  if (!(tag in this.objectToSave)) {
    this.objectToSave[tag] = data_to_save;
  } else if (Array.isArray(this.objectToSave[tag])) {
    this.objectToSave[tag].push(data_to_save);
  } else if (typeof this.objectToSave[tag] === "object") {
    var _tmp_object = JSON.parse(JSON.stringify(this.objectToSave[tag]));
    this.objectToSave[tag] = [];
    this.objectToSave[tag].push(_tmp_object);
    this.objectToSave[tag].push(data_to_save);
  }
  console.log(this.objectToSave)
};

serverEngine.prototype.saveDataToServer = function(
  dataToSave,
  showMsg = false
) {
  var self = this;
  //dataToSave = dataToSave.replace(" ", "");
  dataToSave = dataToSave.replace("score", "pontos");
  dataToSave = dataToSave.replace("level", "nivel");
  dataToSave = dataToSave.replace("time", "tempo");

  var arrayTmp = dataToSave.split("&");
  var arrayScore = {};
  arrayTmp.forEach(function(item, index) {
    arrayScore[item.split("=")[0]] = item.split("=")[1];
  });

  if (self.API) {
    arrayScore["tempo"] = self.timeFormat(arrayScore["tempo"]);
    delete arrayScore["jogo"];
    arrayScore["id_jogo"] = self.queryParam.id_jogo;
  } else {
    arrayScore["time"] = self.timeFormat(arrayScore["tempo"]);
    delete arrayScore["tempo"];
  }

  if (dataToSave.indexOf("nivel") == -1) {
    arrayScore["nivel"] = 1;
    //dataToSave = dataToSave+"&nivel=1";
  }
  arrayScore["nivel"] = parseInt(arrayScore["nivel"]);
  arrayScore["pontos"] = parseInt(arrayScore["pontos"]);

  if (self.jsonServerInfoDynamic.token_salvamento != "") {
    arrayScore["token"] = self.jsonServerInfoDynamic.token_salvamento;
    //dataToSave = dataToSave+"&token="+self.jsonServerInfo.token_salvamento;
  }
  if(self.queryParam["gpi"]) arrayScore["gpi"] = queryToPost["gpi"]

  var urlToSave = self.url_save_data;
  arrayScore["id_usuario"] = self.queryParam.id_usuario;
  if (self.API) {
    urlToSave = self.url_save_data_api;
    arrayScore["id_paciente"] = self.queryParam.id_usuario;
    delete arrayScore["id_usuario"];
  }

  /* var queryToPost = "";
	for (var prop in arrayScore) {
		queryToPost += prop + "=" + arrayScore[prop] + "&";
	} */
  //queryToPost = queryToPost.slice(0, -1);// remove o ultimo caracter & 
  //*/
  
  var queryToPost = "";
  if (this.is_marathon_request){
    
    urlToSave = self.url_marathon;
    console.log("URL MARATONA")
    console.log(urlToSave)

    queryToPost = {};

    Object.assign(queryToPost, arrayScore, this.objectToSave);
    queryToPost["language"] = this.language;
    queryToPost["id_jogo"] = self.queryParam.id_jogo;
    if(self.queryParam.label_user_uid) {
      queryToPost["label_user_uid"] = self.queryParam.label_user_uid;
    }
    queryToPost["miscellaneous"] = {
      type: "game",
      platform: self.queryParam.plataforma,
      userAgent:navigator.userAgent,
      screenHeight:window.screen.height,
      screenWidth:window.screen.width,
    };
    if(queryToPost["obs"]){
      let obs = queryToPost["obs"];
      queryToPost["miscellaneous"]["levelName"] = queryToPost["obs"];
      delete queryToPost["obs"];
    }

    queryToPost["user_token"] = self.queryParam.user_token;

    if (queryToPost["seed"]) {
      let seed = queryToPost["seed"];
      queryToPost["configuration"]["seed"] = seed;
      delete queryToPost["seed"];
    }
    self.saveDataScript(urlToSave,queryToPost,showMsg,"application/json");
  }else if (this.next_plataform ) {
    queryToPost = {};

    Object.assign(queryToPost, arrayScore, this.objectToSave);
    queryToPost["language"] = this.language;
    queryToPost["id_jogo"] = self.queryParam.id_jogo;
    if(self.queryParam.params.name && self.queryParam.params.name != "")
      queryToPost["jogo"] = self.queryParam.params.name;

    queryToPost["miscellaneous"] = {
      type: "game",
      platform: self.queryParam.plataforma,
      userAgent:navigator.userAgent,
      screenHeight:window.screen.height,
      screenWidth:window.screen.width,
    };
    if(queryToPost["obs"]){
      let obs = queryToPost["obs"];
      queryToPost["miscellaneous"]["levelName"] = queryToPost["obs"];
      delete queryToPost["obs"];
    }

    queryToPost["token"] = self.queryParam.token;

    if (queryToPost["seed"]) {
      let seed = queryToPost["seed"];
      queryToPost["configuration"]["seed"] = seed;
      delete queryToPost["seed"];
    }
    self.saveDataScript(urlToSave,queryToPost,showMsg,"application/json");
  } else {
    const formUrlEncoded = x =>
      Object.keys(x).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        ""
      );
    queryToPost = formUrlEncoded(arrayScore).slice(1);
    self.saveDataScript(urlToSave,queryToPost,showMsg,"application/x-www-form-urlencoded");
  }
  if (
    this.queryParam.params["data_save_download"] != undefined &&
    this.queryParam.params["data_save_download"] == "369"
  ) {
    const a = document.createElement("a");
    var _data_object = queryToPost;
    if (typeof _data_object == "string") {
      _data_object = arrayScore;
    }
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(_data_object, null, 2)], {
        type: "text/plain"
      })
    );
    a.setAttribute("download", "save_score_.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  //self._server_client.post(urlToSave,{data:queryToPost})

  var score = arrayScore["pontos"];
  var level = arrayScore["nivel"];
  var time = arrayScore["tempo"];

  //Level update
  if (this.blockLevelType == 1) {
    if (this.pontuation.indexOf(parseInt(level) + 1) == -1)
      this.pontuation.push(parseInt(level) + 1);
  }

  if (self.API) {
    this.log("save data on:" + self.jsonServerInfoDynamic.url_salvamento)
    return self
      ._server_client({
        url: self.jsonServerInfoDynamic.url_salvamento,
        data: queryToPost,
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(msg => {
        this.log("Data Saved!");
      })
      .catch(e => {
        this.log([e, "Data Not Saved!"])
      })
  }

/*   if (this.is_enable_feedback)
    this.feedbackCommunicar.updateScoreGameplay(level, score, time); */
};


serverEngine.prototype.saveDataScript = function(urlToSave,queryToPost,showMsg,contentType){
  let self = this

  return this
  ._server_client({
    url: urlToSave,
    data: queryToPost,
    method: "POST",
    headers: {"Content-Type": contentType}
  })
  .then(data => {
    console.log(data);
    //window.parent.postMessage({"message":layoutString},"http://localhost:3000");
    try{
      window.parent.postMessage({"message":btoa(JSON.stringify((data.data?data.data:data)))} , "*")
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      if (document.webkitIsFullScreen) {
        document.webkitIsFullScreen();
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch(e){
      console.log(e)
    }
    
    self.log("Data Saved!")
    self.jsonServerInfoDynamic = "";
    if(showMsg) {
      alert("Sua pontuação foi salva.")
    }
  })
  .catch(e=>{
    self.log([e, "Data Not Saved!"])
  })
}

serverEngine.prototype.loadData = function() {
  var self = this;
  var urlToGet = self.url_load_data;
  var dataQuery =
    "&id_usuario=" +
    self.queryParam["id_usuario"] +
    "&id_jogo=" +
    self.queryParam["id_jogo"];

  if (self.API) {
    urlToGet = self.url_load_data_api;
    dataQuery =
      "&id_paciente=" +
      self.queryParam["id_usuario"] +
      "&id_jogo=" +
      self.queryParam["id_jogo"];
  }

  self.tokenAuth = self.queryParam["token"];
  urlToGet = urlToGet + "/?timestamp=" + new Date().getTime() + dataQuery;
  console.log(urlToGet);

  return self._server_client
    .get(urlToGet)
    .then(response => {
      self.jsonServerInfo = response.data;
      // self.jsonServerInfo = JSON.parse(response.data);

      if (self.jsonServerInfo.hasOwnProperty("token"))
        self.tokenAuth = self.jsonServerInfo.token;

/*       if (self.is_enable_feedback)
        self.feedbackCommunicar.setJsonServerInfo(self.jsonServerInfo); */

      if (
        self.queryParam["tipo_jogo"] == 2 &&
        self.jsonServerInfo.ultimas_pontuacoes.length > 0
      ) {
        this.log("ultimas_pontuacoes já foi realizado");
        //self.redirectFailure();
      }
    })
    .catch(error => {
      console.log(error);
      console.log("failure to get");
      //self.redirectFailure();
    });
};

export default serverEngine;
