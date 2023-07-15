import { DataTypes } from "sequelize";
import { sequelize } from "./conn";
import { finalquery1 } from "./method1";
import { finalquery2 } from "./method2";
import { toPostgresSyntax } from "./Utils";
(async function () {
  const [result, metadata] = await sequelize.query(finalquery1);

  console.log(result);
})();

(async function () {
  const [result, metadata] = await sequelize.query(
    toPostgresSyntax(finalquery2)
  );

  console.log(result);
})();
