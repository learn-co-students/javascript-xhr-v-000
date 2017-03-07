"use strict"; 
function getRepositories (){
  const req = new XMLHttpRequest();  
  req.addEventListener("load", showRepositories); 
  req.open("GET", 'https://api.github.com/users/octocat/repos'); 
  req.send(); 
}

function getCommits(el) {
  const name = el.dataset.repo; 
  const req = new XMLHttpRequest(); 
  req.addEventListener("load", showCommits); 
  req.open("GET", 'https://api.github.com/repos/octocat/'+ name + '/commits'); 
  req.send(); 
}

function showRepositories (event, data){
  var repos = JSON.parse(this.responseText); 
  console.log(repos); 
  var repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`; 
  document.getElementById("repositories").innerHTML = repoList; 
}

function showCommits() {
  var commits = JSON.parse(this.responseText); 
  var commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`; 
  document.getElementById("commits").innerHTML = commitsList; 
}
