const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

module.exports = function () {
    return `SELECT DISTINCT ?item ?name ?positionItem ?position ?start ?end
               (STRAFTER(STR(?held), '/statement/') AS ?psid)
      WHERE {
          # Positions ever in the cabinet
          ?positionItem p:P361 ?ps .
          ?ps ps:P361 wd:${meta.cabinet.parent} .

          # Who has held those positions since 2000?
          ?item wdt:P31 wd:Q5 ; p:P39 ?held .
          ?held ps:P39 ?positionItem ; pq:P580 ?start .
          OPTIONAL { ?held pq:P582 ?end }

          FILTER NOT EXISTS { ?held wikibase:rank wikibase:DeprecatedRank }
          FILTER (!BOUND(?end) || ?end > "2000-01-01"^^xsd:dateTime)
          FILTER (?start < "2022-01-01"^^xsd:dateTime)

          OPTIONAL {
            ?held prov:wasDerivedFrom ?ref .
            ?ref pr:P248 wd:${meta.source.id} .
            OPTIONAL { ?ref pr:P1810 ?sourceName }
            OPTIONAL { ?ref pr:P1932 ?statedName }
            OPTIONAL { ?ref pr:P813  ?sourceDate }
          }
          OPTIONAL { ?item rdfs:label ?itemEN FILTER(LANG(?itemEN) = "en") }
          BIND(COALESCE(?sourceName, ?itemEN) AS ?name)

          OPTIONAL { ?positionItem rdfs:label ?positionEN FILTER(LANG(?positionEN) = "en") }
          BIND(COALESCE(?statedName, ?positionEN) AS ?position)
      }
      ORDER BY ?sourceDate ?item ?positionItem ?start ?psid`
}
