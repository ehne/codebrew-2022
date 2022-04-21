import requests
import datetime
import csv

def convertToJSON(filename):
    data = {}
    filename2 = 'jsonfiletext.json'
    with open(filename) as csvfile:
        csvReader = csv.reader(csvfile, delimiter = ',')
        for row in csvReader:
            data[row[1]] = {"catagory": row[0], "Ref- unopened": row[2], "Ref - opened": row[3], "Freezer": row[4], "Shelf": row[5]}

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

    convertToJSON("Best Before.csv")

    #lukes code for using JSON

    for dictionary in EXPIRATIONDATES:
        if EXPIRATIONDATES == item:
            longevity = EXPIRATIONDATES[item][header]
            catagory = EXPIRATIONDATES[item]["catagory"]

            # creating an expiration date
            expirationDate = time + timedelta(days = longevity)

    return {"product": item, "time": time, "storage method": storageMethod, "expiry": expirationDate, "catagory": catagory, "opened": opened}

