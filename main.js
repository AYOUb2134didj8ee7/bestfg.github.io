const welcome = document.getElementById("welcome");
const teamsScreen = document.getElementById("teams");
const joinBtn = document.getElementById("joinBtn");
const teamsList = document.getElementById("teamsList");
const startBtn = document.getElementById("startBtn");

let selectedTeam = null;

// Join
joinBtn.onclick = () => {
    welcome.classList.remove("active");
    teamsScreen.classList.add("active");
    loadTeams();
};

// Load teams
function loadTeams() {
    teamsList.innerHTML = "";

    teams.forEach(team => {
        const div = document.createElement("div");
        div.className = "team";

        div.innerHTML = `
            <img src="${team.icon}">
            <strong>${team.name}</strong>

            <div class="stats">
                Attack
                <div class="bar"><span style="width:${team.attack}%"></span></div>
                Defense
                <div class="bar"><span style="width:${team.defense}%"></span></div>
            </div>
        `;

        div.onclick = () => selectTeam(team, div);
        teamsList.appendChild(div);
    });
}

// Select team
function selectTeam(team, element) {
    document.querySelectorAll(".team").forEach(t => t.classList.remove("selected"));
    element.classList.add("selected");
    selectedTeam = team;
    startBtn.disabled = false;
}

// Start game
startBtn.onclick = () => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    window.location.href = "game.html";
};
