from getExpiry import convertToJSON
import json
from http.server import BaseHTTPRequestHandler
from urllib import parse

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # url will look like: api/getStorage?q=item
        s = self.path
        dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
        self.send_response(200)

        convertToJSON("BestBefore.csv")

        item = dic["item"]

        # reading the json file
        openJson = open('api/jsonfiletext.json')
        expiryDict = json.load(openJson)
        VALIDMETHODS = []

        self.send_header('Content-type', 'applocation/json')
        self.end_headers()

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
                break
        # will only return if item is not in csv file
        return self.wfile.write(json.dumps(VALIDMETHODS).encode(encoding='utf-8'))