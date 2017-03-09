// function showRepositories(event, data) {
//   // this is set to the XMLHttpRequest object, in this case, 'req', that fired the event
//   console.log(this.responseText)
//
//   let repoList = "<ul>"
//   // iterate over the length of the 'responseText' property and grab the 'name' property in each repo
//   for (let i = 0; i < this.responseText.length; i++) {
//     repoList += "<li>" + this.responseText[i]['name'] + "</li>"
//   }
//   repoList += "</ul>"
//   document.getElementById('repositories').innerHTML = repoList
// }

//  need to parse it
// function showRepositories(event, data) {
//   // this is set to the XMLHttpRequest object, in this case, 'req', that fired the event. also, have to parse this property with 'JSON.par'
//   let repos = JSON.parse(this.responseText)
//   console.log(repos)
//
//   // iterating through each obj in responseText and grabbing its name property
//   let repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
//
//   document.getElementById('repositories').innerHTML = repoList
// }

// another XHR request
function showRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  console.log(repos)

  // adding link within repo's name
  // passsing 'this' to 'getCommits()' to get the current element that's being clicked on
  let repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  let name = el.dataset.repo
  let req = new XMLHttpRequest()
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}


function getRepositories() {
  const req = new XMLHttpRequest()
  // adding an event listener to the 'req' object
  // then, we're are passsing 2 args to the addEventListener method
  // this fn is taking a ' load event' andn a callback fn that displays the 'responseText' property of the 'req' object
  req.addEventListener('load', showRepositories)
  req.open('GET', 'https://api.github.com/users/octocat/repos')
  req.send()
}
