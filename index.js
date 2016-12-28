function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos);
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  console.log(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}`
  document.getElementById("commits").innerHTML = commitsList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories)
  req.open("GET", 'https://api.github.com/users/achasveachas/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', showCommits)
  req.open("GET", 'https://api.github.com/repos/achasveachas/' + name + '/commits')
  req.send()
}
