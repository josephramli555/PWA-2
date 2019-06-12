var league_url="https://private-044be-dicodingfootball.apiary-mock.com/"


function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}


function json(response) {

  return response.json();
}


function error(error) {

  console.log("Error : " + error);
}



function getAllTeams() {
  if ("caches" in window) {
    caches.match(league_url + "api/v1/json/1/search_all_teams.php?l=2001").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var teamData = "";
          data.teams.forEach(function(teams) {
            teamData += `
                  <div class="card-large light-blue darken-3">
                    <a href="./teamdetail.html?id=${teams.idTeam}">
                      <div class="card-image waves-effect waves-block waves-light">
                      <div class="center-align">
                          <img src="${teams.strTeamBadge}" class="responsive-img"/>
                      </div>
                       </div>
                    </a>
                    <div class="card-content">
                      <div class="card-title white-text center-align">${teams.strTeam}</div>
                      <p>${teams.strDescriptionEN}</p>
                    </div>
                  </div>
                `;
          });

          document.getElementById("playerlist").innerHTML = teamData;
        });
      }
    });
  }

  fetch(league_url + "api/v1/json/1/search_all_teams.php?l=2001")
    .then(status)
    .then(json)
    .then(function(data) {

      var teamData = "";
      data.teams.forEach(function(teams) {
        teamData += `
                  <div class="card-large light-blue darken-3">
                    <a href="./teamdetail.html?id=${teams.idTeam}">
                      <div class="card-image waves-effect waves-block waves-light">
                      <div class="center-align">
                          <img src="${teams.strTeamBadge}" class="responsive-img"/>
                      </div>
                       </div>
                    </a>
                    <div class="card-content">
                      <div class="card-title white-text center-align">${teams.strTeam}</div>
                      <p>${teams.strDescriptionEN}</p>
                    </div>
                  </div>
                `;
      });

      document.getElementById("playerlist").innerHTML = teamData;
    })
    .catch(error);
}

function getAllPlayer() {

  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(league_url + "api/v1/json/1/lookup_all_players.php?id=" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var playerDetail = "";
          data.player.forEach(function(players){
             playerDetail += `
              <div class="card orange accent-4>
                  <a href="./playerdetail.html?id=${players.idPlayer}&saved=false">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${players.strThumb}" class="responsive-img"/>
                       </div>
                  </a>    
                    <div class="card-content">
                      <div class="card-title black-text">${players.strPlayer}</div>
                      <p>DOB:${players.dateBorn}</p>
                      <p>Position:${players.strPosition}</p>
                      <p>Signing:${players.strSigning}</p>
                      <a href="./playerdetail.html?id=${players.idPlayer}&saved=false" class="center-align">
                        Go To Player Detail
                      </a>
                    </div>
                </div>
                `;
          });

          document.getElementById("body-content").innerHTML = playerDetail;
        });
      }
    });
  }

  fetch(league_url + "api/v1/json/1/lookup_all_players.php?id=" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      var playerDetail=""
      data.player.forEach(function(players) {
            playerDetail += ` 
              <div class="card orange accent-4>
                  <a href="./playerdetail.html?id=${players.idPlayer}">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${players.strThumb}" class="responsive-img"/>
                       </div>
                  </a>         
                    <div class="card-content">
                      <div class="card-title black-text">${players.strPlayer}</div>
                      <p>DOB:${players.dateBorn}</p>
                      <p>Position:${players.strPosition}</p>
                      <p>Signing:${players.strSigning}</p>
                      <a href="./playerdetail.html?id=${players.idPlayer}&saved=false" class="center-align">
                        Go To Player Detail>>
                      </a>
                    </div>

                </div>
                `;
          });
      document.getElementById("body-content").innerHTML = playerDetail;
    });
}

function getPlayerById() {
return new Promise(function(resolve, reject){
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  var playerobj;
  if ("caches" in window) {
    caches.match(league_url + "api/v1/json/1/lookup_all_players.php?id" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var playerDetail = "";
          data.player.forEach(function(players){
            console.log(plers.idPlayer+ "  "+idParam);
            if(idParam.includes(players.idPlayer)){
             playerDetail += `
              <div class="card-large orange accent-4>
                    <a href="./playerdetail.html?id=${players.idPlayer}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <div class="center-align">
                          <img src="${players.strThumb}" class="responsive-img"/>
                        </div>
                       </div>
                    </a>
                    <div class="card-content">
                      <div class="card-title black-text truncate center-align">${players.strPlayer}</div>
                      <p>DOB:${players.dateBorn}</p>
                      <p>Position:${players.strPosition}</p>
                      <p>Signing:${players.strSigning}</p>
                      <p>${players.strDescriptionEN}</p>
                    </div>
                  </div>
                `;
                var descrip= players.strDescriptionEN.substring(0,100);
                playerobj={
                  img:players.strThumb,
                  name:players.strPlayer,
                  dob:players.dateBorn,
                  pos:players.strPosition,
                  sign:players.strSigning,  
                  desc:descrip,  
                  id:players.idPlayer
                };
              }
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = playerDetail;
          resolve(playerobj);
        });
      }
    });
  }

  fetch(league_url + "api/v1/json/1/lookup_all_players.php?id" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      var playerDetail=""
      data.player.forEach(function(players) {
        if(idParam.includes(players.idPlayer)){
          console.log("berhasil");
            playerDetail += `
              <div class="card-large orange accent-4>
                    <a href="./index.html>
                      <div class="card-image waves-effect waves-block waves-light center-align">
                        <div class="center-align">
                          <img src="${players.strThumb}" class="responsive-img"/>
                        </div>
                       </div>
                    </a>
                    <div class="card-content">
                      <div class="card-title black-text  truncate center-align">${players.strPlayer}</div>
                      <p>DOB:${players.dateBorn}</p>
                      <p>Position:${players.strPosition}</p>
                      <p>Signing:${players.strSigning}</p>
                      <p>${players.strDescriptionEN}</p>
                    </div>
                  </div>
                `;
                var descrip= players.strDescriptionEN.substring(0,100);
                playerobj={
                  img:players.strThumb,
                  name:players.strPlayer,
                  dob:players.dateBorn,
                  pos:players.strPosition,
                  sign:players.strSigning,  
                  desc:descrip,  
                  id:players.idPlayer
                };
              }
          });
      document.getElementById("body-content").innerHTML = playerDetail;
      resolve(playerobj);
    });
});
}

function getAllSavedPlayer(){
  getAllSavedPlayerDb().then(function(players){
      var playerhtml="";
      players.forEach(function(player){
          playerhtml+=`
              <div class="card orange accent-4>
                  <a href="./playerdetail.html?id=${player.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${player.img}" class="responsive-img"/>
                       </div>
                  </a>    
                    <div class="card-content">
                      <div class="card-title black-text">${player.name}</div>
                      <p>DOB:${player.dob}</p>
                      <p>Position:${player.pox}</p>
                      <p>Signing:${player.sign}</p>
                      <a href="./playerdetail.html?id=${player.id}&saved=true" class="center-align">
                        Go To Player Detail
                      </a>
                    </div>
                </div>
                `;
      });
      document.getElementById("saved-player").innerHTML = playerhtml;
  });
}

function getSavedPlayerById() {
return new Promise(function(resolve, reject){
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  var playerDetail = "";

  getById(idParam).then(function(player) {
    console.log("Player:"+player.name);
    playerDetail = `
              <div class="card orange accent-4>
                  <a href="./playerdetail.html?id=${player.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${player.img}" class="responsive-img"/>
                       </div>
                  </a>    
                    <div class="card-content">
                      <div class="card-title black-text">${player.name}</div>
                      <p>DOB:${player.dob}</p>
                      <p>Position:${player.pos}</p>
                      <p>Signing:${player.sign}</p>
                      <p>${player.desc}</p>
                    </div>
                </div>
                `;
  document.getElementById("body-content").innerHTML = playerDetail;
  resolve(player);
  });
});  
}

