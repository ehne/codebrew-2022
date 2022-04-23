import string
import json
import pip._vendor.requests as rq
from http.server import BaseHTTPRequestHandler
from urllib import parse
'''
url = "milk=eggs"
URL = url.split("=")
ingredients = []
for p in URL:
    ingredients.append(p)

stringIngredients = (((str(ingredients).replace("'","")).replace("[","")).replace("]","")).replace(" ","")
'''
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = self.path
        dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
        self.send_response(200)
        ingredient1 = dic["ing1"]
        ingredient2 = dic["ing2"]
        ingredient3 = dic["ing3"]

        stringIngredients = f"{ingredient1},{ingredient2},{ingredient3}"
        urlRequestGet = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?i=' + stringIngredients
    
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

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
            message = recipeInfoList
        message = ["No recipes found with those ingredients."]
        return self.wfile.write(json.dumps(message).encode(encoding='utf-8'))