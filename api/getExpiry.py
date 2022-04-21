import requests
import datetime
import csv

def convertToJSON(filename):
    data = {}
    filename2 = 'jsonfiletext.json'
    with open(filename) as csvfile:
        csvReader = csv.reader(csvfile, delimiter = ',')
        for row in csvReader:
            data[row[1]] = {"category": row[0], "Ref - unopened": row[2], "Ref - opened": row[3], "Freezer": row[4], "Shelf": row[5]}

    with open(filename2, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent = 4))

def expirationDate(url):
    URL = url.split("=")
    item = URL[1][:-2]
    time = URL[2][:-2]
    storageMethod = URL[3][:-2]
    opened = URL[4]

    # lukes code for headers
    # if storageMethod == "Refridgerator" and opened == True:
    #     header = "Ref - Opened"

    if storageMethod == "Refridgerator" and opened == False:
        header = "Ref - unopened"

    if storageMethod == "Refridgerator" and opened == True:
        header = "Ref - opened"

    if storageMethod == "Freezer":
        header = "Freezer"

    if storageMethod == "Shelf":
        header = "Shelf"
    

    convertToJSON("Best Before.csv")

    #lukes code for using JSON
    openJson = open('keyboardsmash.json')
    expiryDict = json.load(openJson)
    expiryList = list(expiryDict.items())[0][1]

    for dictionary in expiryList:
        if expiryList == item:
            longevity = expiryList[item][header]
            category = expiryList[item]["category"]

            # creating an expiration date
            expirationDate = time + timedelta(days = longevity)

    return {"product": item, "time": time, "storage method": storageMethod, "expiry": expirationDate, "category": category, "opened": opened}

