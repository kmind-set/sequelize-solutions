export function hasDistinctOn(attributes: any, distinct_on: string, seq : any) {

    const distinctIndex = attributes.findIndex((field: string) => field === distinct_on)
    attributes.splice(distinctIndex, 1)
    let newAttr = new Array
    newAttr[0] = [seq.literal(`DISTINCT ON ("${distinct_on}") "${distinct_on}"`), `"${distinct_on}"`]

    newAttr = [...newAttr, ...attributes]
    return newAttr
}


export function hasSubquery(attributes: any, subquery: string, alias: string, seq : any) {

    attributes[attributes.length - 1] =
        [seq.literal(`"${attributes[attributes.length - 1]}" from ((${subquery}))`), `"${alias}"`]
    return attributes
}