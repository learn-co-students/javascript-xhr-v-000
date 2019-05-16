
function showRepositories(event) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos');
  req.send();
}

function getCommits(element){
  const name = element.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + '/commits');
  req.send();
}

function showCommits(event){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => {
    commit.author ? login_name = commit.author.login : login_name = "N/A"
    return '<li><strong>' + login_name + "</strong> - " + commit.commit.message + "</li>"
  }).join("")}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
