import os
import codecs
import json
#~ from lxml import etree
import lxml.html

target = "test/index.html"
url = "http://de.wikipedia.org/wiki/Liste_von_Bergen_in_der_Schweiz"
command = "wget %s -O %s" % (url, target)
#~ os.popen(command)

f = open(target)
html = lxml.html.fromstring(f.read())
f.close()

tables = html.xpath("//table")
table = tables[2]

rows = table.xpath("//tr/th")
#~ row = rows[2]
#~ ths = row.xpath("th")
#~ print len(rows)
for cell in rows[:8]:
    text = cell.xpath("string()").replace("(km)","").replace("(m)","")
    text = text.strip()
    print text

#~ f = codecs.open("out.html","w", encoding="utf-8")
f_out = codecs.open("out.json","w", encoding="utf-8")

rows = table.xpath("//tr")
print len(rows)
#~ liste = {}
liste = []
for i, row in enumerate(rows):
    cells = row.xpath("td")
    if len(cells)==8:
        #~ print cells[1].xpath("string()")
        #~ cell = cells[1]
        out = []
        for cell in cells[1:3]:
            links = cell.xpath("a")
            if links:
                out.append(links[0].xpath("string()"))
            else:
                out.append(cell.xpath("string()"))
		#~ liste.update({"n%s"% (i):{"name":out[0], "hight":out[1]}})
        liste.append({"name":out[0], "hight":out[1]})
        
        
        #~ f.write('<li><a data-icon="info" data-rel="dialog" data-transition="pop" href="#no_info">%s (%s)</a></li>\n' % (out[0], out[1]))

#~ f.close()

f_out.write(json.dumps({"mountains" : {"Switzerland" : liste}}))
f_out.close()

#~ for table in tables:
    #~ print len(table)


print lxml.html.tostring(table)[:100]
