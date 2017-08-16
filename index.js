function getRepositories(el) {

  var req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos')
  req.send();
}

function showRepositories() {
  console.log(this.responseText);
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul> ${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick = "getCommits(this)">Get Commits </a> </li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {

  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/'+ name+ '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList = `<ul>${commits.map(c => '<li><strong>' +c.author.login+ '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitList;
}
