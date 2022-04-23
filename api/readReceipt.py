# not in form to be used as an API yet

import requests
import csv
import json

# api usage code obtained from GitHub user Zaargh
# https://github.com/Zaargh/ocr.space_code_example/blob/master/ocrspace_example.py 
def ocr_space_file(filename, overlay=False, api_key='K82515733988957', language='eng'):
    """ OCR.space API request with local file.
        Python3.5 - not tested on 2.7
    :param filename: Your file path & name.
    :param overlay: Is OCR.space overlay required in your response.
                    Defaults to False.
    :param api_key: OCR.space API key.
                    Defaults to 'helloworld'.
    :param language: Language code to be used in OCR.
                    List of available language codes can be found on https://ocr.space/OCRAPI
                    Defaults to 'en'.
    :return: Result in JSON format.
    """
    payload = {'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               }
    with open(filename, 'rb') as f:
        r = requests.post('https://api.ocr.space/parse/image',
                          files={filename: f},
                          data=payload,
                          )
    return r.content.decode()


# function to find the item of food from the large list
def findItem(item, FOOD, index):

    item = item.lower()
    ITEM = item.split()
    # dict should contain food item with the confidence it is that food item
    FOODITEMSCONFIDENCE = {}
    maxConfidence = 0

    for word in ITEM:
        if len(word) > 2 and word[0].isnumeric() == False and word[1].isnumeric() == False:
            # list should contain confidences for each word in the list of food
            CONFIDENCES = []
            for fooditem in FOOD:
                FOODITEM = fooditem.split()

                #checking if there is additional information for that item of food
                if len(FOODITEM) > index:
                    foodword = FOODITEM[index]
                else:
                    foodword = FOODITEM[0]

                # getting rid of cases and punctuation bugs
                foodword = foodword.lower()
                if foodword[0] == "(":
                    foodword = foodword[1:]
                if foodword[-1] == "," or foodword[-1] == ")":
                    foodword == foodword[:-1]

                # counting the letters of each word that are the same
                length = min(len(word),len(foodword))
                count = 0
                for letter in range(length):
                    if  word[letter] == foodword[letter]:
                        count += 1

                # confidence in that word is the percentage that is incorrect
                confidence = count/max(len(word),len(foodword))
                # adding to list for each food item, index should correspond to corresponding food item in FOOD list
                CONFIDENCES.append(confidence)

            # choosing the confidence that is the highest
            maximum = max(CONFIDENCES)
            #can have multiple food items with the same confidence so accomodating for that
            foodItem = ''
            for n in range(len(CONFIDENCES)):
                if CONFIDENCES[n] == maximum:
                    foodItem = foodItem + "* " + FOOD[n]
            FOODITEMSCONFIDENCE[foodItem] = maximum


    if FOODITEMSCONFIDENCE:       
        maxConfidence = max(list(FOODITEMSCONFIDENCE.values()))
    # threshold so there is no few letters matching to cause wild inaccuracies    
    if maxConfidence > 0.6:
        maximums = ''
        for fooditem in FOODITEMSCONFIDENCE:
            # there may be multiple items in FOODITEMSCONFIDENCE with the same max confidence
            if FOODITEMSCONFIDENCE[fooditem] == maxConfidence:
                maximums += fooditem

        # this accomodates for the brie vs cheese issue and similar
        for item in maximums.split("* "):
            if len(item.split()) == 1 and maxConfidence > 0.8:
                maximums = f"* {item}"
                break

        # will return string containing the items that all have the maximum confidence
        return maximums


# (currently) function to find all the food items on the receipt
def read_receipt(imagename):
    FOOD = []
    message = []

    # creating a list of all the different types of produce (including different brands)
    with open('ProduceList.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for fooditem in csv_reader:
            FOOD.append(fooditem[0])

    try:
        # Use examples:
        fileAPIOutput = ocr_space_file(filename = imagename, language='eng', overlay = True)

        OUTPUT = fileAPIOutput.split('''"''')
        PRODUCE = []

        # taking into account the api might read letters as ""
        index1 = OUTPUT.index("ParsedText")+2
        index2 = OUTPUT.index("ErrorMessage")-1

        # creating a list of all the lines read by the api
        for i in range(index1,index2):
            for item in OUTPUT[i].split("\\r\\n")[:-1]:
                PRODUCE.append(item)

        # will occur if the api cannot read the image
        if PRODUCE == []:
            print("there was an error reading the image, please take a new photo and try again or enter manually")

        # removing common unneccessary words from the receipt
        DISALLOWED = ["woolworths", "people", "coles", "iga", "aldi", "foodworks", "net"]
        PRODUCEALLOWED = []
        for item in PRODUCE:
            allowed = True
            for word in item.split():
                if word.lower() in DISALLOWED:
                    allowed = False
                    break
            if allowed == True:
                PRODUCEALLOWED.append(item)

        # reading json file of different brands and their corresponding items
        openJson = open('brands.json')
        BRANDS = json.load(openJson)


        for item in PRODUCEALLOWED:
            # using above function to find food items with the highest confidence
            ITEMS = findItem(item, FOOD, 0)
            # may not fing any items
            if ITEMS:
                ITEMS = ITEMS.split("* ")[1:]

                # it is only confident in one item so it must be that item
                if len(ITEMS) == 1:
                    #accomodating for brands that dont include the actual item in the name, i.e oreos vs biscuits
                    if ITEMS[0] in BRANDS:
                        itemtype = BRANDS[ITEMS[0]]
                    else:
                        itemtype = ITEMS[0]
                    message.append({"item name" : ITEMS[0], "itemtype" : itemtype})
                    
                else:
                    GUESSES = []
                    ITEMS2 = findItem(item, ITEMS, 1)
                    if ITEMS2:
                        ITEMS2 = ITEMS2.split("* ")[1:]
                        for guess in ITEMS2:
                            # if the same item has been suggested in both trials then it is likely that item
                            if guess in ITEMS:
                                GUESSES.append(guess)

                        # only has confidence in one item it should be that item
                        if len(GUESSES) == 1:
                            if GUESSES[0] in BRANDS:
                                itemtype = BRANDS[GUESSES[0]]
                            else:
                                itemtype = GUESSES[0]
                            message.append({"item name" : ITEMS[0], "itemtype" : itemtype})

    except:
        # generally occurs do to a time out
        message =  "there was an issue reading the file"

    return message

print(read_receipt("receipttest.jpeg"))