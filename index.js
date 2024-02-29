// global variable to store favorite list
 var favouriteMeals = [];

// global variable to store the list of items after search
 export let mealList = [];

    // accessing search input
const searchInputEl = document.getElementById('searchInput');
const getMealDetailsEl = document.getElementById('getMealDetails');
const favoriteListEl = document.getElementById('favoriteList');

    //calling api for every value change
if(searchInputEl) {
    searchInputEl.oninput = async function () {
        await searchMeal(searchInputEl.value);
    }
}  
    
    async function searchMeal(value) {
        try{
            mealList = [];
            const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
            const data = await result.json();
            mealList = [...data.meals];
            loadResult(mealList);        
        }
        catch(error) {
            console.error(error);
        }
    }

// loading API data 
    function loadResult(mealList) {
        emptysearchResult();
        mealList.forEach((meal) => {
            const divEl = document.createElement('div');
            const btnDiv = document.createElement('div');
            const inputEl = document.createElement('input');
            const favoritebtnEl = document.createElement('button');
            btnDiv.className = 'btnDiv';
            favoritebtnEl.classList.add('favoritebtn') ;
            favoritebtnEl.innerHTML = 'Add to favorite';
            favoritebtnEl.id = meal.idMeal;
            favoritebtnEl.type = 'button';  
            inputEl.type = 'submit';
            inputEl.name = meal.idMeal;
            inputEl.value = meal.strMeal;
            inputEl.className = 'inputTag'
            divEl.className = 'buttonDiv'
            divEl.appendChild(inputEl);
            btnDiv.appendChild(favoritebtnEl);
            getMealDetailsEl.appendChild(divEl);
            getMealDetailsEl.appendChild(btnDiv);

            favoritebtnEl.addEventListener('click',() => {
                // favoritebtnEl.classList.remove('favoritebtn') ;
                // favoritebtnEl.classList.add('selectedbtn') ;

                favouriteMeals.push(meal);
                loadFavoriteList(favouriteMeals)
            });
        });
    }

    // loading favorite list data
    function loadFavoriteList(meals) {
        clearList();
        meals.forEach((meal,index) => {
            const divEl = document.createElement('div');
            const btnDiv = document.createElement('div');
            const inputEl = document.createElement('input');
            const favoritebtnEl = document.createElement('button');
            btnDiv.className = 'btnDiv';
            favoritebtnEl.classList.add('favoritebtn') ;
            favoritebtnEl.innerHTML = 'Remove';
            favoritebtnEl.id = meal.idMeal;
            favoritebtnEl.type = 'button';  
            inputEl.type = 'submit';
            inputEl.name = meal.idMeal;
            inputEl.value = meal.strMeal;
            inputEl.className = 'inputTag'
            divEl.className = 'buttonDiv'
            divEl.appendChild(inputEl);
            btnDiv.appendChild(favoritebtnEl);
            favoriteListEl.appendChild(divEl);
            favoriteListEl.appendChild(btnDiv);

            favoritebtnEl.addEventListener('click',() => {
                console.log(index);
                favouriteMeals.splice(index,1);
                loadFavoriteList(favouriteMeals)
            })
        })
    }

    // removing all elements from favorite list
    function clearList() {
        let lastChild = favoriteListEl.lastChild;
        while(lastChild) {
            favoriteListEl.removeChild(lastChild);
            lastChild = favoriteListEl.lastChild;
        }
    }

// removing all elements from list
    function emptysearchResult() {
        let lastChild = getMealDetailsEl.lastChild;
        while(lastChild) {
            getMealDetailsEl.removeChild(lastChild);
            lastChild = getMealDetailsEl.lastChild;
        }
    }   
