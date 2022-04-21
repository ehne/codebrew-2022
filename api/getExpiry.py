import csv
import json
from datetime import *

def convertToJSON(filename):
    data = {}
    filename2 = 'jsonfiletext.json'
    with open(filename) as csvfile:
        csvReader = csv.reader(csvfile, delimiter = ',')
        for row in csvReader:
            data[row[1]] = {"category": row[0], "Ref - unopened": row[2], "Ref - opened": row[3], "Freezer": row[4], "Shelf": row[5]}
            print(data[row[1]])
            
    with open(filename2, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent = 4))

def expirationDate(url):
    expiryDate = 0
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
    

    convertToJSON("BestBefore.csv")

    #lukes code for using JSON
    openJson = open('jsonfiletext.json')
    expiryDict = json.load(openJson)
    expiryList = list(expiryDict.items())

    print(expiryList)
    for dictionary in expiryList:
        print(dictionary)
        if dictionary == item:
            print("bananavuifahbijkan")
            longevity = expiryList[item][header]
            category = expiryList[item]["category"]

            year = time[0:4]
            month = time[5:7]
            date = time[8:10]
            datePurchased = date(year,month,date)

            # creating an expiration date
            expiryDate = datePurchased + timedelta(days = longevity)

    return {"product": item, "time": time, "storage method": storageMethod, "expiry": expiryDate, "category": category, "opened": opened}

print(expirationDate("api/getExpiry?q=Buttermilk&t=2022-04-21&s=Refridgerator&o=opened"))
