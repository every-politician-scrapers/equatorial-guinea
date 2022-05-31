const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

module.exports = (enlabel) => {
  claims = {
    P31:   { value: 'Q294414' }, // instance of: public office
    P17:   { value: meta.country ? meta.country.id : meta.jurisdiction.id },
    P1001: { value: meta.jurisdiction.id },
    P361:  { value: 'Q30261839' }
  }

  return {
    type: 'item',
    labels: {
      en: enlabel,
    },
    descriptions: {
      en: `government position in ${meta.jurisdiction.name}`,
    },
    claims: claims
  }
}
