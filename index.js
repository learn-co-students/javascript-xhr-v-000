function showRepositories(event, data) {
  console.log(this.responseText)
  let repoList = "<ul>"
  for(var i=0;i < this.responseText.length; i++) {
    repoList += "<li>" + this.responseText[i]["name"] + "</li>"
  }
  repoList += "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}


function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
