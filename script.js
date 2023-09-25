document.addEventListener("DOMContentLoaded", function () {
    const podium = document.getElementById("podium");

    // Chargez le fichier "retards.csv" directement depuis le site
    fetch("retards.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));

            const matieres = rows.map(row => {
                if (row.length >= 2) {
                    return {
                        Matiere: row[0].trim(),
                        Heures: parseFloat(row[1].trim())
                    };
                }
                return null;
            }).filter(item => item !== null); 

            matieres.sort((a, b) => b.Heures - a.Heures);

            const podiumHTML = `
                <div class="container">
                <br>
                    <ol>
                        <li>${matieres[1].Matiere} <br> ${matieres[1].Heures} heures loupées</li>
                        <li>${matieres[0].Matiere} <br> ${matieres[0].Heures} heures loupées</li>
                        <li>${matieres[2].Matiere} <br> ${matieres[2].Heures} heures loupées</li>
                    </ol>
                </div>
            `;
            podium.innerHTML = podiumHTML;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors du chargement du fichier CSV : ", error);
        });
});
