import axios from "axios";
import * as cheerio from "cheerio";
import RaritiesModel from "../../models/rarities";
import CategoryModel from "../../models/category";
export const scrappeShadowverseRarities = async (endpoint) => {
  const shadowverseCategory = await CategoryModel.findOne({
    name: "Shadowverse",
  });

  const { data } = await axios.get(endpoint);
  // Load the HTML using cheerio
  const $ = cheerio.load(data);

  // Find all option elements
  const optionElements = $("option");

  // Extract and print the values
  const values: any[] = [];
  optionElements.each((index, element) => {
    const value = $(element).attr("value");
    if (value !== undefined) {
      values.push({ name: value });
    }
  });
  console.log(shadowverseCategory._id);

  return await RaritiesModel.bulkWrite(
    values.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: { ...item, categoryId: shadowverseCategory._id } },
        upsert: true,
      },
    }))
  );
};
