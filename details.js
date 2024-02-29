let id;
let mealdetails;
const searchParams = new URLSearchParams(window.location.search);
for (const param of searchParams) {
  id = param[0];
  await searchMealById();
}

async function searchMealById() {
        try{
            mealdetails = [];
            const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await result.json();
            const temp = [...data.meals];
            mealdetails = temp[0];
            console.log(mealdetails);        
        }
        catch(error) {
            console.error(error);
        }
}

const headingEl = document.getElementById('heading');
const categoryEl = document.getElementById('category');
const areaEl = document.getElementById('area');
const instructionEl = document.getElementById('instruction');
const ingredientsEl = document.getElementById('ingredients');
const imageDivEl = document.getElementById('imageDiv');
const videoDiv = document.getElementById('videoDiv');

headingEl.innerHTML = mealdetails.strMeal;
categoryEl.innerHTML = `Category: ${mealdetails.strCategory}`;
areaEl.innerHTML = `Origin: ${mealdetails.strArea}`;
instructionEl.innerHTML = mealdetails.strInstructions;

const imageEl = document.createElement('img');
imageEl.src = mealdetails.strMealThumb;
imageDivEl.appendChild(imageEl);

const videoLinkEL = document.createElement('a');
videoLinkEL.href = mealdetails.strYoutube;
videoLinkEL.innerHTML = `<button class="clickbtn">Click Here</button>`;
videoDiv.appendChild(videoLinkEL);
