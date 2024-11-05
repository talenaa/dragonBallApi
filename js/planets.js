const requestURL = 'https://dragonball-api.com/api/planets?limit=20';

async function fetchPlanetsJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error in the Json request ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error getting planets from the API : ', error);
        return null;
    }
   
}

function createPlanetsCard ({ name, isDestroyed, image}){
    return `
        <div class="card" style="width: 200px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${isDestroyed}</p>
            </div>
        </div>
`;
}

async function displayPlanets() {
    const planetsSection = document.getElementById('planetsSection');
    const planetsData = await fetchPlanetsJson();

    if (planetsData && planetsData.items){
        const planetsCards = planetsData.items.map(createPlanetsCard).join('');
        planetsSection.innerHTML = planetsCards;
    }
    else
    {
        planetsSection.innerHTML = `<p>The Json of the planets could not be loaded</p>`;    
    }
}


displayPlanets();