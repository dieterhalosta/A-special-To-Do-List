//This is the time display function

const dateElement = document.getElementById("date");

const option = {weekday : "long", month : "short", day : "numeric"};
const today = new Date ();

dateElement.innerHTML = today.toLocaleDateString("en-US", option);

//This is to see if there is any item or if the user adds an item
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//This is the saving of the items on the To Do List
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

//Functions for the buttons on the items
function setStatusPending(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Holding on';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
  
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

//This is the function to get the items from the local storage and display them into the new <div>
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListe = document.getElementById('issuesList');
    var issueInfo = document.getElementById('infos');

    issuesList.innerHTML = '';
   


    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
    
        issuesList.innerHTML +=   '<div class="well">'+
                                  '<h6>Issue ID: ' + id + '</h6>'+
                                  '<p class="insi"><span class="badge badge-dark">' + status + '</span></p>'+
                                  '<h3>' + desc + '</h3>'+
                                  '<p class="insi"><span class="glyphicon glyphicon-time"></span> ' + severity + '   ' +'<span class="glyphicon glyphicon-user"></span> ' + assignedTo +'</p>'+
                                  '<a href="#" onclick="setStatusPending(\''+id+'\')" class="btn btn-lg btn-secondary">Hold on</a> '+
                                  '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-lg btn-success">Close</a> '+
                                  '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-lg btn-danger">Delete</a>'+
                                  '</div>';                  
      }
}