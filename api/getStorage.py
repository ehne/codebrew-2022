from getExpiry import convertToJSON
import json

def storageMethods(url):
    # url will look like: api/getStorage?q=item
    convertToJSON("BestBefore.csv")
    URL = url.split("=")
    item = URL[1]

    # reading the json file
    openJson = open('jsonfiletext.json')
    expiryDict = json.load(openJson)
    VALIDMETHODS = []

    # searching through the expiryDict for the required item
    for dictionary in expiryDict:
        if dictionary == item:
            # checking if the method of storage is valid
            for storageMethod in ["Ref - unopened","Freezer","Shelf"]:
                if expiryDict[item][storageMethod] != "NA":
                    # only need refridgerator not unopened and opened
                    if storageMethod == "Ref - unopened":
                        VALIDMETHODS.append("Refrigerator")
                    else:
                        VALIDMETHODS.append(storageMethod)
            return VALIDMETHODS
    # will only return if item is not in csv file
    return "invalid item"

# testing
print(storageMethods("api/getStorage?q=Spinach"))
