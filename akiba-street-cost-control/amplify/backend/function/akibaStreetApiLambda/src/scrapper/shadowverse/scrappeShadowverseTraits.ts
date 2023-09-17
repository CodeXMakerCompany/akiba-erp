import axios from "axios";
import * as cheerio from "cheerio";
import ClassModel from "../../models/class";
import CategoryModel from "../../models/category";
export const scrappeShadowverseTraits = async (endpoint) => {
  const shadowverseCategory = await CategoryModel.findOne({
    name: "Shadowverse",
  });

  const { data } = await axios.get(endpoint);
  // Load the HTML using cheerio
  const $ = cheerio.load(data);

  // Find all option elements
  const selectors = $(".searchform-Select");

  const options = [];

  selectors
    .eq(5)
    .find("option")
    .each((index, input) => {
      const text = $(input).text();

      if (text !== undefined) {
        options.push({ name: text });
      }
    });

  return await ClassModel.bulkWrite(
    options.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: { ...item, categoryId: shadowverseCategory._id } },
        upsert: true,
      },
    }))
  );
};
