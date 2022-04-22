from getExpiry import convertToJSON
import json

def storageMethods(url):
    # url will look like: api/getStorage?q=item
    convertToJSON("BestBefore.csv")
    URL = url.split("=")
    item = URL[1]

    openJson = open('jsonfiletext.json')
    expiryDict = json.load(openJson)
    expiryList = dict(expiryDict.items())
    VALIDMETHODS = []

    for dictionary in expiryList:
        if dictionary == item:
            for storageMethod in ["Ref - unopened","Ref - opened","Freezer","Shelf"]:
                if expiryList[item][storageMethod] != "NA":
                    VALIDMETHODS.append(storageMethod)
            return VALIDMETHODS

    return "invalid item"


print(storageMethods("api/getStorage?q=Spinach"))
