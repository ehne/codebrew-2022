import csv
import json
import datetime
from datetime import timedelta

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
    expiryDate = 0
    URL = url.split("=")
    item = URL[1][:-2]
    time = URL[2][:-2]
    storageMethod = URL[3][:-2]
    opened = bool(URL[4])

    if storageMethod == "Refridgerator" and opened == False:
        header = "Ref - unopened"
    elif storageMethod == "Refridgerator" and opened == True:
        header = "Ref - opened"
    elif storageMethod == "Freezer":
        header = "Freezer"
    elif storageMethod == "Shelf":
        header = "Shelf"
    else:
        print("you are stupid")
    

    convertToJSON("BestBefore.csv")

    #lukes code for using JSON
    openJson = open('jsonfiletext.json')
    expiryDict = json.load(openJson)
    expiryList = dict(expiryDict.items())

    for dictionary in expiryList:
        if dictionary == item:
            longevity = expiryList[item][header]
            category = expiryList[item]["category"]

            year = int(time[0:4])
            month = int(time[5:7])
            date = int(time[8:10])
            datePurchased = datetime.datetime(year,month,date)

            # creating an expiration date
            if longevity == "NA":
                return {"product": item, "time": time, "storage method": storageMethod, "expiry": "error in storage", "category": category, "opened": opened}
            else:
                expiryDate = datePurchased + timedelta(days = int(longevity))
                print(expiryDate.year)
                expiryDate = str(expiryDate.date())

    return {"product": item, "time": time, "storage method": storageMethod, "expiry": expiryDate, "category": category, "opened": opened}

print(expirationDate("api/getExpiry?q=Cheese, hard (such as cheddar, swiss, block parmesan)&t=2022-04-21&s=Refridgerator&o=True"))
