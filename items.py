# -*- coding: utf-8 -*-

"""
Opens a csv file with itemes and converts them tho json

TODO: Wichtige Abfragen in Funktionen packen
TODO: Berechnung der Entfernung zwischen zwei Punkten. 
"""

import os
import json

class Item():
    def __init__(self):
        pass
    
    def load(self, file_name):
        
        assert os.path.exists(file_name)
        csv = open(file_name)
        data = []
        for item in csv.readlines():
            item.strip().split(";")
            data.append(item.strip().split(";"))
        csv.close()
        data = [i for i in data if not i[1] == ""]
        data = [i for i in data if not i[1] == "Artikel"]
        self.data = data


    def get_json(self):
        items = []
        for item in self.data:
            items.append({"name": {"en": item[0], "de": item[1]}, "brand": item[2], 
                          "typ": item[3], "size": item[4], "count": item[5],
                          "weight": item[6]})
        return json.dumps(items)


liste = Item()
liste.load("/home/alex/Dokumente/item_list.csv")
f = open("items.json", "w")
f.write(liste.get_json())
f.close()
