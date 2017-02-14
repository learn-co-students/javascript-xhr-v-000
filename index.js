function getRepositories() {
  const url = 'https://api.github.com/users/Dom-Mc/repos';
  const req = new XMLHttpRequest();

  req.addEventListener('load', showRepositories);
  req.open('GET', url);
  req.send();
}

function showRepositories() {
  let repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;

  document.getElementById("repos").innerHTML = repoList;
}

function getCommits(tag) {
  const name = tag.dataset.repo;
  const req = new XMLHttpRequest();
  const url = 'https://api.github.com/repos/Dom-Mc';

  req.addEventListener("load", showCommits);
  req.open("GET", `${url}/${name}/commits`);
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;

  document.getElementById("commits").innerHTML = commitsList;
}





//
// function getRepositories() {
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", showRepositories);
//   req.open("GET", 'https://api.github.com/users/octocat/repos')
//   req.send()
// }
// function showRepositories(event, data) {
//   // console.log(this.responseText)
//   let repoList = "<ul>"
//   for(var i=0;i < this.responseText.length; i++) {
//     // debugger
//     repoList += "<li>" + this.responseText[i]["name"] + "</li>"
//   }
//   repoList += "</ul>"
//   debugger
//   // document.getElementById("repositories").innerHTML = repoList
// }
