function getRepositories() {
  var req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories)
  req.open("GET", 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  var repoList = "<ul>";
  var repoName;
  for (var i = 0; i < repos.length; i++) {
    repoName = repos[i].name;
    repoList += "<li>" + repoName + ' - <a href="#" data-repo="' + repoName + '" onclick="getCommits(this)">Get Commits</a>' + "</li>";
  }
  repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  var repoName = el.dataset.repo;
  var req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/octocat/' + repoName + '/commits');
  req.send();
}

function showCommits(event, data) {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  var commitList = "<ul>";
  var commit,commitAuthor,commitAuthorLogin;
  for (var i = 0; i < commits.length; i++) {
    commit = commits[i];
    commitAuthor = commit.author;
    if (commitAuthor) {
      commitAuthorLogin = commit.author.login;
    } else {
      commitAuthorLogin = "null";
    }
    commitList += "<li><strong>" + commitAuthorLogin + "</strong> - " + commit.commit.message + "</li>";
  }
  commitList += "</ul>";
  document.getElementById("commits").innerHTML = commitList;
}
