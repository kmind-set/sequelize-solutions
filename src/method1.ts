import { DataTypes } from "sequelize";
import { hasDistinctOn, hasSubquery } from "./Utils";
import { generateQuery, tempModel } from "./generator";

import { sequelize } from "./conn";
import { Book, BooksFromAuthor } from "./models";

//Books from Oscar Wilde, Stephen King
const subquery = generateQuery(
  Book,
  {
    include: [
      {
        association: BooksFromAuthor,
        attributes: [sequelize.literal(`"Author"."name" as author_name`)],
        where: {
          name: ["Oscar Wilde", "Stephen King"],
        },
      },
    ],
  },
  false
);

const tempmodel = tempModel(
  "books",
  {
    Author_name: DataTypes.STRING,
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    published_year: DataTypes.INTEGER,
  },
  sequelize
);

let newatt = hasDistinctOn(
  ["author_name", "name", "publication_year"],
  "author_name",
  sequelize
);

newatt = hasSubquery(newatt, subquery, "books", sequelize);

export let finalquery1 = generateQuery(
  tempmodel,
  {
    attributes: newatt,
    raw: true,
    order: ["author_name", ["publication_year", "desc"]],
  },
  true
);
