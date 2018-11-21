export const date = ({a, b, idA = 0, idB = 0, asc = true}) => {
  const aa = (new Date(a)).getTime();
  const bb = (new Date(b)).getTime();
  if (aa > bb) {
    return asc ? 1 : -1;
  }
  if (aa < bb) {
    return asc ? -1 : 1;
  }
  return idA - idB;
};

export const string = ({a = '', b = '', idA = 0, idB = 0, asc = true}) => {
  a = a ? a.toUpperCase() : '';
  b = b ? b.toUpperCase() : '';
  if (a > b) {
    return asc ? 1 : -1;
  }
  if (a < b) {
    return asc ? -1 : 1;
  }
  return idA - idB;
};

export const number = ({a = '', b = '', idA = 0, idB = 0, asc = true}) => {
  if (a > b) {
    return asc ? 1 : -1;
  }
  if (a < b) {
    return asc ? -1 : 1;
  }
  return idA - idB;
};

export const stringNumber = ({a = '', b = '', idA = 0, idB = 0, asc = true}) => {
  let aa = asc ? a : b;
  let bb = asc ? b : a;
  var ax = [], bx = [];

  aa.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']); });
  bb.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return idA - idB;
};
