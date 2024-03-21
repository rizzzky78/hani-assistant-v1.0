require("module-alias/register");

const { readFileSync, writeFileSync } = require("fs");

class App {
  constructor() {
    /**
     * @type { string }
     */
    this.pathRawJSON = "./assets/json/static/mappedproducts.json";
    /**
     * @type { string }
     */
    this.pathPartialProducts = "./assets/json/static/partialproducts.json";
    /**
     * @type { import("@interface/product").Product[] }
     */
    this.rawDataProducts = [];
    /**
     * @type { { id: string; cat: import("@interface/product").ProductCategory; productName: string; memPrice: number; poins: number; weight: number }[] }
     */
    this.partialProducts = [];

    /**
     * @type { Array<import("@interface/product").Product> }
     */
    this.realDataProducts = [];

    this.readData();
    this.appendChanges()
  }
  /**
   *
   * @returns { import("@interface/product").Product[] }
   */
  readData() {
    this.rawDataProducts = JSON.parse(readFileSync(this.pathRawJSON, "utf-8"));
    this.partialProducts = JSON.parse(
      readFileSync(this.pathPartialProducts, "utf-8")
    );
  }

  appendChanges() {
    this.rawDataProducts.forEach((v) => {
      // i wanted to mape rawData products and append changes for partialProducts data and assign prop of memberPrice, poin, weight
    });
  }
}
