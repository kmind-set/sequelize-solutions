export function hasDistinctOn(attributes: any, distinct_on: string, seq: any) {
  const distinctIndex = attributes.findIndex(
    (field: string) => field === distinct_on
  );
  attributes.splice(distinctIndex, 1);
  let newAttr = new Array();
  newAttr[0] = [
    seq.literal(`DISTINCT ON ("${distinct_on}") "${distinct_on}"`),
    `"${distinct_on}"`,
  ];

  newAttr = [...newAttr, ...attributes];
  return newAttr;
}

export function hasSubquery(
  attributes: any,
  subquery: string,
  alias: string,
  seq: any
) {
  attributes[attributes.length - 1] = [
    seq.literal(`"${attributes[attributes.length - 1]}" from ((${subquery}))`),
    `"${alias}"`,
  ];
  return attributes;
}

export function toPostgresSyntax(query: string) {
  return query
    .replace(
      / as ([\w]+)\.([\w]+)([\s]{1}|\,{1})/gi,
      (match, v1, v2, v3) => ` as "${v1}.${v2}"${v3} `
    )
    .replace(
      /([\s]{1})([\w]+)\.([\*]{1}|[\w]+)([\s]{1}|\,{1})/g,
      (match, v1, v2, v3, v4) => {
        if (v3 === "*") return ` "${v2}".*${v4}`;
        return ` "${v2}"."${v3}"${v4}`;
      }
    )
    .replace(/([\w]+) as /gi, (match, v1) => ` "${v1}" as `)
    .replace(/ as ([\w]+) /gi, (match, v1) => ` as "${v1}"  `)
    .replace(/(\"\(\()([^]*)(\)\)\")/, (match, v1, v2, v3) => ` (( ${v2} )) `);
}
