import { Sequelize, DataTypes, Model, FindOptions, Utils, ModelCtor } from 'sequelize';

export function generateQuery(model: any, queryOptions: any, hasSubquery: boolean = false) {

    model._injectScope(queryOptions)

    try {

        if (queryOptions.include) {
            const include = model._validateIncludedElements(queryOptions, model)     
        }

     

    } catch (error) {
        console.log("validateIncludedElements, Utils Error", error)
    }
    const query = model.queryInterface.queryGenerator.selectQuery(
        model.getTableName(),
        queryOptions,
        model
    ).slice(0, -1)

    if (!hasSubquery) return query

    const re = new RegExp(`AS \"${model.name}\"{1} FROM \"${model.name}\"{1}`, "g")
    return query.replace(re, "")
}

export function tempModel(modelName: string, options: {}, seq:any) {

    return seq.define(modelName, options)
}


