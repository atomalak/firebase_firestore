const teamList = document.getElementById("teamlist");;

writeToResultToPage = (doc) => {

    let subChild = document.createElement("li");
    subChild.addEventListener("click", (e) => {
        const team = e.target.firstChild.textContent;
        const year = e.target.firstChild.nextElementSibling.textContent;
        const id = e.target.getAttribute("data-id")
        document.getElementById("name").value = team;
        document.getElementById("year").value = year;
        document.getElementById("save").style.display = "none";
        document.getElementById("update").style.display = "block";
        document.getElementById("update").setAttribute("data-id", id);
    })
    subChild.className = "list-group-item";
    let name = document.createElement("span");
    let year = document.createElement("span");
    let button = document.createElement("button");
    button.addEventListener("click", removeData);
    button.className = "btn btn-danger";
    button.textContent = "Sil";
    name.textContent = doc.data().team_name;
    year.textContent = doc.data().team_year;
    subChild.setAttribute("data-id", doc.id);
    subChild.appendChild(name);
    subChild.appendChild(year);
    subChild.appendChild(button);
    teamList.appendChild(subChild);
}

removeData = (e) => {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("/teams").doc(id).delete().then(() => {
        console.log("silindi");
        clearChilds();
        retrieveData();
    }).catch((e) => {
        console.log("silindi");
    })
}

function clearChilds() {
    while (teamList.firstChild) {
        teamList.removeChild(teamList.firstChild);
    }
}


async function retrieveData() {
    // const result = await db.collection("/teams").where("team_name","==","Galatasaray").get();
    //const result = await db.collection("/teams").orderBy("team_year",'asc').get();
    const result = await db.collection("/teams").get();
    result.docs.forEach(doc => {
        writeToResultToPage(doc);
    });
}

retrieveData();

async function saveTeams() {
    const name = document.getElementById("name").value;
    const year = document.getElementById("year").value;
    const result = await db.collection("/teams").add({ "team_name": name, "team_year": year });
    if (result.path) {
        clearChilds();
        retrieveData();
    }

}

function updateTeam(e) {
    const name = document.getElementById("name").value;
    const year = document.getElementById("year").value;
    const id = e.target.getAttribute("data-id");

    db.collection("/teams").doc(id).update({ "team_name": name, "team_year": year }).then(() => {
        clearChilds();
        retrieveData();
    }).catch(() => {

    })
}

