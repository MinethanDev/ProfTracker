/**
 * 
 * @param {string} name Le nom de la matière
 * @param {int} hours Le nombre d'heures manquées
 * @param {int} pos La position sur le podium
 * @returns 
 */
function buildPodiumPosition(name, hours, pos) {
    const podiumTemplate = document.querySelector('[data-podium-template]');
    // on clone l'élément <template> du HTML pour pouvoir le réutiliser à volonté
    const podium = podiumTemplate.content.cloneNode(true).children[0]

    // on remplit les valeurs du template cloné
    podium.querySelector('[data-index]').textContent = pos
    podium.querySelector('[data-matiere]').querySelector('[data-name]').textContent = name
    podium.querySelector('[data-matiere]').querySelector('[data-hours]').textContent = hours === 1 ? `${hours} heure manquée` : `${hours} heures manquées`

    switch (pos) {
        case 1:
            podium.classList.add('first')
            break
        case 2:
            podium.classList.add('second')
            break
        case 3:
            podium.classList.add('third')
            break
        default:
            podium.classList.remove('position')
            break
    }

    return podium
}

document.addEventListener("DOMContentLoaded", function () {
    const podium = document.getElementById('podium')

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

            for (let i = 0; i < matieres.length; i++) {
                // on créé une nouvelle position sur le podium
                const position = buildPodiumPosition(matieres[i].Matiere, matieres[i].Heures, i+1)
                podium.appendChild(position)
            }
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors du chargement du fichier CSV : ", error);
        });
});
