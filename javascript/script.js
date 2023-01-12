//this javascript builds and organises the information for the website, and generates tables based on the information.

//it starts by declaring some empty array variables for the 3 information sets that are used
let teams = [];
let comments = [];
let messages = [];

//then 2 class constructors are built for the team and comment objects
//by default, all the teams have a favourite value of false
//new objects are also pushed into their respective arrays
function Team(name, image, location) {
    this.name = name;
    this.image = image;
    this.location = location;
    this.favourite = false;
    teams.push(this);
};

function Comment(team, text, verdict) {
    this.team = team;
    this.text = text;
    this.verdict = verdict;
    comments.push(this);
};

//if the site is loading for the first time, teams objects and some example comment objects are created, and placed into session storage.
if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("hasCodeRunBefore", true);

    let blackSwan = new Team("Black Swan Rapper", `<img src = "images/blackSwan.jpg">`, "Sheffield");
    let mabelGubbins = new Team("Mabel Gubbins", `<img src = "images/mabelGubbins.jpg">`, "Oxford");
    let medlock = new Team("Medlock", `<img src = "images/medlock.jpg">`, "Manchester");
    let newcastleKingsmen = new Team("Newcastle Kingsmen", `<img src = "images/newcastleKingsmen.jpg">`, "Newcastle");
    let northgate = new Team("Northgate Rapper", `<img src = "images/northgate.jpg">`, "Bath");
    let sheffieldSteel = new Team("Sheffield Steel Rapper", `<img src = "images/sheffieldSteel.jpg">`, "Sheffield");
    let thrales = new Team("Thrales", `<img src = "images/thrales.jpg">`, "London");
    let towerRavens = new Team("Tower Ravens", `<img src = "images/towerRavens.jpg">`, "London");
    let whipTheCat = new Team("Whip the Cat", `<img src = "images/whipTheCat.jpg">`, "Nottingham");

    sessionStorage.setItem("teams", JSON.stringify(teams));

    let comment1 = new Comment("Black Swan", "The best thing I've ever seen.", true)
    let comment2 = new Comment("Newcastle Kingsmen", "Truly terrible", false)

    sessionStorage.setItem("comments", JSON.stringify(comments));
    sessionStorage.setItem("messages", JSON.stringify(messages));
};

//this function generates a table from the team information stored in the session storage, it is linked to the table in teams.html
//it loads a heart picture depending on the favourite value of each object
let buildTable = () => {
    let teamsArr = [];
    let table = document.getElementById("teamsTable");
    let teams = JSON.parse(sessionStorage.getItem("teams"));
    let i = 0;
    teams.forEach(team => {
        let teamArr = [];
        teamArr.push(team.name, team.image, team.location);
        if (team.favourite) {
            teamArr.push(`<img src = "images/heartRed.png" class = "heart" id = "heart${i}" onclick = "favourite(${i})">`)
        }
        else {
            teamArr.push(`<img src = "images/heartBlack.png" class = "heart" id = "heart${i}" onclick = "favourite(${i})">`)
        }
        teamsArr.push(teamArr);
        i++;
    });
    teamsArr.forEach(team => {
        let row = document.createElement("tr");
        team.forEach(value => {
            let cell = document.createElement("td");
            cell.innerHTML = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
};

//this function toggles the favourite value of an object and updates the session storage and tables, it is linked to the heart pictures in the teams table
let favourite = i => {
    let teams = JSON.parse(sessionStorage.getItem("teams"));
    if (teams[i].favourite) {
        teams[i].favourite = false
        document.getElementById(`heart${i}`).parentElement.innerHTML = `<img src = "images/heartBlack.png" class = "heart" id = "heart${i}" onclick = "favourite(${i})">`
    }
    else {
        teams[i].favourite = true
        document.getElementById(`heart${i}`).parentElement.innerHTML = `<img src = "images/heartRed.png" class = "heart" id = "heart${i}" onclick = "favourite(${i})">`
    };
    sessionStorage.setItem("teams", JSON.stringify(teams));
    let count = 0
    teams.forEach(team => {
        if (team.favourite) {
            count++
        }
    });
    if (count == 1) {
        alert (`There is now ${count} team on your favourites page`)
    }
    else {
        alert (`There are now ${count} teams on your favourites page`)
    }
};

//this function builds a table in favourites.html, and fills it only with teams that have the favourite value true
let buildFavouritesTable = () => {
    let favouritesArr = [];
    let table = document.getElementById("favouritesTable");
    let teams = JSON.parse(sessionStorage.getItem("teams"));
    teams.forEach(team => {
        let teamArr = [];
        if (team.favourite) {
            teamArr.push(team.name, team.image, team.location);
        }
        favouritesArr.push(teamArr);
    });
    favouritesArr.forEach(team => {
        let row = document.createElement("tr");
        team.forEach(value => {
            let cell = document.createElement("td");
            cell.innerHTML = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
};

//this function builds a table in contact.html to display comments in the session storage
//similarly to the favourites in the teams table, the verdict value is represented by a thumbs up or thumbs down image
let buildCommentsTable = () => {
    let commentsArr = [];
    let commentsTable = document.getElementById("commentsTable");
    let comments = JSON.parse(sessionStorage.getItem("comments"));
    comments.forEach(comment => {
        let commentArr =[];
        commentArr.push(comment.team, comment.text)
        if (comment.verdict) {
            commentArr.push(`<img src = "images/thumbsUp.png" class = "verdict">`)
        }
        else [
            commentArr.push(`<img src = "images/thumbsDown.png" class = "verdict">`)
        ]
        commentsArr.push(commentArr)
    });
    commentsArr.forEach(comment => {
        let row = document.createElement("tr");
        comment.forEach(value => {
            let cell = document.createElement("td");
            cell.innerHTML = value;
            row.appendChild(cell);
        })
        commentsTable.appendChild(row)
    });
};

//this function allows users to add a comment, it updates the session storage and the comments table, then resets the form values
let addComment = () => {
    let commentsTable = document.getElementById("commentsTable");
    let comments = JSON.parse(sessionStorage.getItem("comments"));
    let team = document.getElementById("whichTeam").value;
    let text = document.getElementById("comment").value;
    let verdict = document.getElementById("verdict").value;
    let newComment = new Comment(team, text, verdict);
    let newCommentArr = [team, text]
    if (newComment.verdict) {
        newCommentArr.push(`<img src = "images/thumbsUp.png" class = "verdict">`)
    }
    else [
        newCommentArr.push(`<img src = "images/thumbsDown.png" class = "verdict">`)
    ]
    comments.push(newComment)
    sessionStorage.setItem("comments", JSON.stringify(comments));
    let row = document.createElement("tr");
    newCommentArr.forEach(value => {
        let cell = document.createElement("td");
        cell.innerHTML = value;
        row.appendChild(cell);
    });
    commentsTable.appendChild(row);
    document.getElementById("whichTeam").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("verdict").value = "";
};

//I tried researching how to send emails in javascript, but I was told that it can't be done with javascript alone, so I've instead stored messages in session storage
function sendEmail() {
    let messages = JSON.parse(sessionStorage.getItem("messages"));
    messages.push(document.getElementById("contact").value);
    sessionStorage.setItem("messages", JSON.stringify(messages));
    console.log(messages);
    document.getElementById("contact").value = "";
};