function showRepositories(event, data){
  var repos = JSON.parse(this.responseText)
  //console.log(this)
  console.log(repos)
  //console.log(this)
  var test = this
  const repoList = `<ul>${repos.map(function(r){
    console.log(test)
    return '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'}).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits(){
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('commits').innerHTML = commitList
}

function getCommits(el){
  console.log(el)
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits")
  req.send()
}

function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories)
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
