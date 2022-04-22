import csv
import json
import datetime
from datetime import timedelta
from http.server import BaseHTTPRequestHandler
from urllib import parse

def convertToJSON(filename):
    data = {}
    filename2 = 'jsonfiletext.json'
    # reading through the csv file
    with open(filename) as csvfile:
        csvReader = csv.reader(csvfile, delimiter = ',')
        #converting to dictionary
        for row in csvReader:
            data[row[1]] = {"category": row[0], "Ref - unopened": row[2], "Ref - opened": row[3], "Freezer": row[4], "Shelf": row[5]}

    # writing to json file       
    with open(filename2, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent = 4))

# trying the api code to be able to use from url
class handler(BaseHTTPRequestHandler):
    def expirationDate(self):
        # url will look like: api/getExpiry?q=item&t=time&s=storageMethod&o=opened
        s = self.path
        dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
        self.send_response(200)

        # converting queries to already defined variable names cause its easier
        item = dic["item"]
        time = dic["time"]
        storageMethod = dic["storageMethod"]
        opened = dic["opened"]

        # using the storage names as per the file
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

        #code for using JSON
        openJson = open('jsonfiletext.json')
        expiryDict = json.load(openJson)

        for dictionary in expiryDict:
            # finding the item in the dictionary
            if dictionary == item:
                longevity = expiryDict[item][header]
                category = expiryDict[item]["category"]

                #converting time inputted to date time
                year = int(time[0:4])
                month = int(time[5:7])
                date = int(time[8:10])
                datePurchased = datetime.datetime(year,month,date)

                # creating an expiration date
                if longevity == "NA":
                    # error in storage method
                    return {"product": item, "time": time, "storage method": storageMethod, "expiry": "error in storage", "category": category, "opened": opened}
                else:
                    # valid storage method
                    expiryDate = datePurchased + timedelta(days = int(longevity))
                    expiryDate = str(expiryDate.date())
                    return {"product": item, "time": time, "storage method": storageMethod, "expiry": expiryDate, "category": category, "opened": opened}