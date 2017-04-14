function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
};

function showCommits() {
  var commits = JSON.parse(this.responseText);
  const commitsList = "<ul>" + commits.map(function(c) {
      return "<li> <strong>" + c.author.login + "</strong> - <a href='" + c.html_url + "'>" + c.commit.message + "</a></li>"
    }).join("") + "</ul>"
  document.getElementById("commits").innerHTML = commitsList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(object) {
  var repo = object.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/octocat/' + repo + '/commits');
  req.send();
}
