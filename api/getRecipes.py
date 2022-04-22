import pip._vendor.requests as rq
url = "tomato=huihijk"
URL = url.split("=")
#    ingredient = URL[1]
ingredient = 'tomato'
urlRequestGet = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingredient
r = rq.get(urlRequestGet)
recipes = r.json()

listRecipes = list(recipes.items())[0][1]

def recipeInfoFunction():
    recipeInfoList = []
    for i in listRecipes:
        recipeInfo = []
        nameRecipe = list(i.values())[0]
        thumbnailRecipe = list(i.values())[1]
        linkRecipe = 'https://www.themealdb.com/meal.php?c=' + list(i.values())[2]

        recipeInfo.append(nameRecipe)
        recipeInfo.append(thumbnailRecipe)
        recipeInfo.append(linkRecipe)
        recipeInfoList.append(recipeInfo)
    print(recipeInfoList)

recipeInfoFunction()




