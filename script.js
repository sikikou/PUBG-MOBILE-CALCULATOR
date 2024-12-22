document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addMatchForm').addEventListener('submit', handleAddMatch);
    displayLeaderboard();
});

const placementPoints = {
    1: 10, 2: 6, 3: 5, 4: 5, 5: 3, 6: 2, 7: 1, 8: 1,
    9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0
};

let matchResults = {};

function calculateTotalPoints() {
    const teamData = {};
    for (const [team, matches] of Object.entries(matchResults)) {
        let totalKillPoints = 0;
        let totalPlacementPoints = 0;
        let wwcdCount = 0;

        matches.forEach(([placement, kills]) => {
            totalPlacementPoints += placementPoints[placement] || 0;
            totalKillPoints += kills;
            if (placement === 1) wwcdCount += 1;
        });

        teamData[team] = {
            placementPoints: totalPlacementPoints,
            killPoints: totalKillPoints,
            wwcd: wwcdCount,
            totalPoints: totalPlacementPoints + totalKillPoints
        };
    }

    return Object.entries(teamData).sort((a, b) => b[1].totalPoints - a[1].totalPoints);
}

function displayLeaderboard() {
    const sortedResults = calculateTotalPoints();
    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = '';

    sortedResults.forEach(([team, data], index) => {
        const row = tbody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = team;
        row.insertCell().textContent = data.killPoints;
        row.insertCell().textContent = data.placementPoints;
        row.insertCell().textContent = data.wwcd;
        row.insertCell().textContent = data.totalPoints;
    });
}

function handleAddMatch(event) {
    event.preventDefault();
    const teamName = document.getElementById('teamName').value;
    const placement = parseInt(document.getElementById('placement').value, 10);
    const kills = parseInt(document.getElementById('kills').value, 10);

    if (!matchResults[teamName]) {
        matchResults[teamName] = [];
    }
    matchResults[teamName].push([placement, kills]);

    displayLeaderboard();

    // Reset form fields
    document.getElementById('teamName').value = '';
    document.getElementById('placement').value = '';
    document.getElementById('kills').value = '';
}
