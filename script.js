/**
 * 
 * @param {string} name Le nom de la matière
 * @param {int} hours Le nombre d'heures manquées
 * @param {int} pos La position sur le podium
 */
function buildPodiumPosition(name, hours, pos) {
    const podiumTemplate = document.querySelector('[data-podium-template]')
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

/**
 * 
 * @param {string} path Le chemin du fichier CSV à charger
 */
function loadCSV(path) {
    const podium = document.getElementById('podium')
    const podiumTable = document.getElementById('table')
    podiumTable.style.display = 'none'

    fetch(path)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','))

            const matieres = rows.map(row => {
                if (row.length >= 2) {
                    return {
                        Matiere: row[0].trim(),
                        Heures: parseFloat(row[1].trim())
                    }
                }
                return null
            }).filter(item => item !== null) 

            matieres.sort((a, b) => b.Heures - a.Heures)

            for (let i = 0; i < matieres.length; i++) {
                // on créé une nouvelle position sur le podium
                const position = buildPodiumPosition(matieres[i].Matiere, matieres[i].Heures, i+1)
                if (i < 3) {
                    podium.appendChild(position)
                } else {
                    podiumTable.style.display = 'flex'

                    const matiere = position.querySelector('[data-matiere]')
                    const tr = document.createElement('tr')
                    const td1 = document.createElement('td')
                    const td2 = document.createElement('td')

                    td1.appendChild(matiere.querySelector('[data-name]'))
                    td2.appendChild(matiere.querySelector('[data-hours]'))

                    tr.appendChild(td1)
                    tr.appendChild(td2)

                    podiumTable.querySelector('tbody').appendChild(tr)
                }
            }
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors du chargement du fichier CSV : ", error)
        })
}

function enableNavigationMenu() {
    const open = document.getElementById('open-menu')
    const close = document.getElementById('close-menu')
    const menu = document.getElementById('menu-content')

    open.addEventListener('click', () => {
        menu.classList.remove('hidden')
    })

    close.addEventListener('click', () => {
        menu.classList.add('hidden')
    })
}

document.addEventListener("DOMContentLoaded", function () {
    enableNavigationMenu()
})
