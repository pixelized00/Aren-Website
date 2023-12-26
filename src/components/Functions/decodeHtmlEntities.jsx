//Tırnak işareti engelleme fonksiyonu
function decodeHtmlEntities(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export default decodeHtmlEntities;
