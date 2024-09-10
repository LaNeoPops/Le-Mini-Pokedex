$(document).ready(function() {
    $('#search-button').on('click', async function() {
        const id = $('#pokemon-id').val();
        const infoContainer = $('#pokemon-info');

        // Validation de l'ID pour s'assurer qu'il est entre 1 et 893
        if (id < 1 || id > 893) {
            alert('Veuillez entrer un ID de Pokémon entre 1 et 893.');
            return;
        }

        try {
            // Appel à l'API PokeAPI pour obtenir les données du Pokémon
            const speciesResponse = await $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
                method: 'GET'
            });

            // Trouver le nom en français 
            const names = speciesResponse.names || [];
            const pokemonNameEntry = names.find(name => name.language.name === 'fr');
            const pokemonName = pokemonNameEntry ? pokemonNameEntry.name : 'Nom non disponible';

            // Trouver le génus en français
            const genera = speciesResponse.genera || [];
            const pokemonGenusEntry = genera.find(genus => genus.language.name === 'fr');
            const pokemonGenus = pokemonGenusEntry ? pokemonGenusEntry.genus : 'Génus non disponible';

            // Extraction des informations en français depuis la réponse
            const flavorTextEntries = speciesResponse.flavor_text_entries || [];
            const pokemonDescriptionEntry = flavorTextEntries.find(entry => entry.language.name === 'fr');
            const pokemonDescription = pokemonDescriptionEntry ? pokemonDescriptionEntry.flavor_text : 'Description non disponible';

            const pokemonCaptureRate = speciesResponse.capture_rate;

            // URL de l'image du Pokémon
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            // Mise à jour du conteneur d'informations avec les données du Pokémon
            infoContainer.html(`
                <h2>${pokemonName}</h2>
                <div class="capture-rate"><strong>Taux de capture : </strong> ${pokemonCaptureRate}%</div>
                <p><strong>Famille : </strong> ${pokemonGenus}</p>
                <img src="${imageUrl}" alt="${pokemonName}">
                <p><strong>Description : </strong> ${pokemonDescription}</p>
            `).fadeIn();  // Affichage en utilisant fadeIn

        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de récupérer les données du Pokémon.');
        }
    });
});
