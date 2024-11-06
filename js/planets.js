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

function createPlanetsCard ({name, image, description, isDestroyed}){
  return `
       <div class="cards">
          <img src="${image}" class="cardImgTop" alt="dbz planets">
          <div class="cardBody"></div>
            <div class= "allList">
                <p class="listInfo">${name}</p>
                <p class="listInfo">${description}</p>
                <p class="listInfo">${isDestroyed}</p>
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