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
        data = [i for i in data if not i[0] == ""]
        data = [i for i in data if not i[0] == "Artikel"]
        self.data = data


    def get_json(self):
        items = []
        for item in self.data:
            items.append({"name": {"de": item[0]}, "brand": item[1], 
                          "typ": item[2], "size": item[3], "count": item[4],
                          "weight": item[5]})
        return json.dumps(items)


liste = Item()
liste.load("/home/alex/Dokumente/item_list.csv")
f = open("items.json", "w")
f.write(liste.get_json())
f.close()
