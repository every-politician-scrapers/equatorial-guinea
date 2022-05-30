// wd create-entity create-office.js "Minister for X"
const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

module.exports = (label, ministry) => {
  reference = {
    P248: meta.source.id,
    P813: new Date().toISOString().split('T')[0],
  }

  claims = {
    P31:   { value: 'Q294414' }, // instance of: public office
    P279:  { value: 'Q83307'  }, // subclas of: minister
    P17:   { value: meta.country ? meta.country.id : meta.jurisdiction.id },
    P1001: { value: meta.jurisdiction.id },
    P361:  {
      value: meta.cabinet.parent,
      references: reference,
    }
  }

  if(ministry)   claims['P2389']  = ministry

  return {
    type: 'item',
    labels: {
      en: label,
    },
    descriptions: {
      en: `government position in ${meta.jurisdiction.name}`,
    },
    claims: claims
  }
}
