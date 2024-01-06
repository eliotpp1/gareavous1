window.addEventListener('DOMContentLoaded', function () {
    function toggleMenu() {
        const burgerIcon = document.querySelector('.burger-icon');
        const menuBurger = document.querySelector('#menu_burger');
        burgerIcon.classList.toggle('active');
        menuBurger.style.left = (menuBurger.style.left === '0px' || menuBurger.style.left === '') ? '-300px' : '0';
    }

    const burgerIcon = document.querySelector('.burger-icon');
    burgerIcon.addEventListener('click', toggleMenu);

    const menu = document.querySelector('#menu_burger');
    const bouton = document.querySelector('.burger-icon');
    const liens = document.querySelectorAll('#menu_burger a');

    // Fonction pour fermer le menu
    function fermerMenu() {
        menu.style.left = '-300px';
        bouton.classList.remove('active');
    }

    // Gestionnaire d'événements pour le clic sur le document
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !bouton.contains(e.target)) {
            fermerMenu();
        }
    });

    // Pour fermer le menu quand on clique sur un lien
    liens.forEach(lien => {
        // Ajoute un écouteur d'événement au clic sur le lien
        lien.addEventListener('click', (event) => {
            // Sélectionne le menu et le masque
            fermerMenu();
        });
    });

    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
        menu.style.left = (menu.style.left === '0px' || menu.style.left === '') ? '-300px' : '0';
        bouton.classList.toggle('active');
    }

    
});


// Fecth API

// page accueil

fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/trafic-de-voyageurs-et-marchandises-depuis-1841/records?select=AVG(voyageurs)%20AS%20moyenne_voyageurs&where=annee%20%3E%3D%202000%20AND%20annee%20%3C%3D%202019&limit=1")
    .then(response => response.json())
    .then(data => {
        
        // Conversion du nombre
        const moyenneVoyageurs = data.results[0].moyenne_voyageurs;
        const convertedValue = moyenneVoyageurs / 1000; // Divisez par 1000 pour obtenir le résultat en milliards

        // Affichage du résultat
        document.querySelector("#moyenne_voyageurs").innerHTML += convertedValue.toFixed(2) + " <br> Milliards";
    })
    .catch(error => console.error(error));

fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/nombre-total-agents-effectifs/records?select=SUM(effectif)%20AS%20total_effectif&limit=1&refine=date%3A%222021%22")
    .then(response => response.json())
    .then(data => {

        
        // Conversion du nombre
        const totalEffectif = data.results[0].total_effectif;
        const convertedValue = totalEffectif / 1000; // Divisez par 1000 pour obtenir le résultat en milliards

        // Affichage du résultat
        document.querySelector("#total_effectif").innerHTML += convertedValue.toFixed(2) + " <br> Milliers";
    })
    .catch(error => console.error(error));

    fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/referentiel-gares-voyageurs/records?select=COUNT(code_gare)%20AS%20total_gares&limit=1")
    .then(response => response.json())
    .then(data => {

        
        // Conversion du nombre
        const totalGares = data.results[0].total_gares;
        const convertedValue = Math.floor(totalGares / 1); // Arrondir à l'entier inférieur

        // Affichage du résultat
        document.querySelector("#total_gares").innerHTML += convertedValue + " <br> Gares";
    })
    .catch(error => console.error(error));

//carte de restauration

fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/menus-des-bars-tgv/records?select=categorie_produit%2C%20%20%20%20%20produit%2C%20%20%20%20%20prix_au_produit&group_by=categorie_produit%2C%20produit%2C%20prix_au_produit&order_by=categorie_produit&limit=58")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Création du tableau
        const tableau = document.createElement('table');
        const divTable = document.querySelector('.tableau'); // Utilisation de la classe au lieu de l'ID

        // Ajout de l'en-tête
        const enTete = tableau.createTHead();
        const ligneEnTete = enTete.insertRow();
        const celluleCatégorie = ligneEnTete.insertCell(0);
        const celluleProduit = ligneEnTete.insertCell(1);
        const cellulePrix = ligneEnTete.insertCell(2);
        celluleCatégorie.textContent = 'Catégorie';
        celluleProduit.textContent = 'Produit';
        cellulePrix.textContent = 'Prix';

        // Ajout des données
        const corpsTableau = tableau.createTBody();
        data.results.forEach(result => {
            const ligne = corpsTableau.insertRow();
            const celluleCatégorie = ligne.insertCell(0);
            const celluleProduit = ligne.insertCell(1);
            const cellulePrix = ligne.insertCell(2);

            celluleCatégorie.textContent = result.categorie_produit;
            celluleProduit.textContent = result.produit;
            cellulePrix.textContent = result.prix_au_produit+'€';
        });

        // Ajout du tableau au document
        divTable.appendChild(tableau);
    })
    .catch(error => console.error(error));


