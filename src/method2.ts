import { DataTypes } from "sequelize";

import { generateQuery, tempModel } from "./generator";
import { sequelize } from "./conn";
import { hasDistinctOn } from "./Utils";
import { Book, BooksFromAuthor } from "./models";

let subquery = generateQuery(
  Book,
  {
    include: [
      {
        required: true,
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
    author_name: DataTypes.STRING,
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    published_year: DataTypes.INTEGER,
  },
  sequelize,
  { tableName: `((${subquery}))` }
);

let newatt = hasDistinctOn(
  ["author_name", "name", "publication_year"],
  "author_name",
  sequelize
);

export let finalquery2 = generateQuery(
  tempmodel,
  {
    attributes: newatt,
    raw: true,
    order: ["author_name", ["publication_year", "desc"]],
  },
  false
);
