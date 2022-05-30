module.exports = (label) => {
  return {
    type: 'item',
    labels: {
      en: label,
      es: label,
    },
    descriptions: {
      en: 'Equatoguinean politician',
    },
    claims: {
      P31: { value: 'Q5' }, // human
      P106: { value: 'Q82955' }, // politician
    }
  }
}
