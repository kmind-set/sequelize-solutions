import { Sequelize, DataTypes, Model, FindOptions, Utils, ModelCtor } from 'sequelize';
import { generateQuery, tempModel } from './generator';
import { hasDistinctOn, hasSubquery } from './Utils';

const sequelize = new Sequelize('postgres://user:pass@host:port/database')

const Author = sequelize.define("Author", {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
});
const Book = sequelize.define("Book", {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    publication_year: DataTypes.INTEGER,
    author: {
        type: DataTypes.INTEGER
    }

});

const AuthorWithBooks = Author.hasMany(Book, { foreignKey: "author", sourceKey: "author_id" })
const BooksFromAuthor = Book.belongsTo(Author, { foreignKey: "author" })


const subquery = generateQuery(Book, {

    include: [{
        required: true,
        association: BooksFromAuthor,
        attributes: [sequelize.literal(`"Author"."name" as author_name`)],
        where: {
            name: ["Oscar Wilde", "Stephen King"]
        },
    }]
}, false)



const tempmodel = tempModel('books', {
    "Author_name": DataTypes.STRING,
    "author": DataTypes.STRING,
    "name": DataTypes.STRING,
    "published_year": DataTypes.INTEGER,
}, sequelize)


let newatt = hasDistinctOn([
    "author_name",
    "name",
    "publication_year"],
    'author_name', sequelize)

newatt = hasSubquery(newatt, subquery, "books", sequelize)



let finalquery = generateQuery(tempmodel, {
    attributes: newatt,
    raw: true,
    order: ['author_name', ["publication_year", "desc"]]
}, true);

(async function () {
    const [result, metadata] = await sequelize.query(finalquery)

    console.log(result)
})();




