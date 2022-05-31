#!/bin/bash

# Static source; import complete; no need to re-run

cd $(dirname $0)

# qsv join --left position cpssa.csv raw reconciled-positions.csv | qsv select minister,position\[1\],portfolio,startdate,enddate | qsv join --left minister - name reconciled-people.csv | qsv select id,minister,position,portfolio,startdate,enddate | qsv rename item,name,positionItem,position,start,end > scraped.csv

# wd sparql -f csv wikidata.js | sed -e 's/T00:00:00Z//g' -e 's#http://www.wikidata.org/entity/##g' | qsv dedup -s psid | qsv search -s start . > wikidata.csv

# bundle exec ruby diff.rb | qsv sort -s name,position | tee diff.csv

cd ~-
