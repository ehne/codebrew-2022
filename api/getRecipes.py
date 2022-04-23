import string
import pip._vendor.requests as rq
url = "milk=eggs"
URL = url.split("=")
ingredients = []
for p in URL:
    ingredients.append(p)

stringIngredients = (((str(ingredients).replace("'","")).replace("[","")).replace("]","")).replace(" ","")

def recipeInfoFunction():
    urlRequestGet = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?i=' + stringIngredients
   
    r = rq.get(urlRequestGet)
    recipes = r.json()
    listRecipes = list(recipes.items())[0][1]

    if listRecipes != None:
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
        return recipeInfoList
    return "No recipes found with those ingredients."

print(recipeInfoFunction())



