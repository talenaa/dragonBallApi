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
         <div class="cards">
            <img src="${image}" class="cardImgTop" alt="dbz characters">
            <div class="cardBody">
                <p class="cardName">${name}</p>
                <p class="cardText">${race} - ${gender}</p>
            </div>
            <div class="allList">
                <p class="listInfo">Base Ki: ${ki}</p>
                <p class="listInfo">Max Ki: ${maxKi}</p>
                <p class="listInfo">Affiliation: ${affiliation}</p>
            </div>
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