import { DataTypes } from "sequelize";
import { sequelize } from "./conn";

export const Author = sequelize.define("Author", {
  author_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
});
export const Book = sequelize.define("Book", {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  publication_year: DataTypes.INTEGER,
  author: {
    type: DataTypes.INTEGER,
  },
});

const AuthorWithBooks = Author.hasMany(Book, {
  foreignKey: "author",
  sourceKey: "author_id",
});
export const BooksFromAuthor = Book.belongsTo(Author, { foreignKey: "author" });
