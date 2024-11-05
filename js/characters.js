const requestURL = 'https://dragonball-api.com/api/characters/?limit=58';

async function fetchCharactersJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error in the Json request ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error getting characters from the API: ', error);
        return null;
    }
   
}

function createCharactersCard ({ name, ki, maxKi, gender, affiliation, race, image}){
    return `
         <div class="card" style="width: 200px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${race} - ${gender}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${ki}</li>
                <li class="list-group-item">${maxKi}</li>
                <li class="list-group-item">${affiliation}</li>
            </ul>
        </div>
`;
}

async function displayCharacters() {
    const charactersSection = document.getElementById('charactersSection');
    const charactersData = await fetchCharactersJson();

    if (charactersData && charactersData.items){
        const charactersCards = charactersData.items.map(createCharactersCard).join('');
        charactersSection.innerHTML = charactersCards;
    }
    else
    {
        charactersSection.innerHTML = `<p>The Json of the characters could not be loaded</p>`;    
    }
}


displayCharacters();