import axios from "axios";
import RaritiesModel from "../../models/rarities";
import CategoryModel from "../../models/category";
export const scrappeWixossRarities = async (endpoint) => {
  const wixossCategory = await CategoryModel.findOne({
    where: {
      name: "wixoss",
    },
  });

  const { data } = await axios.get(endpoint);

  return await RaritiesModel.bulkWrite(
    data.items.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: { ...item, categoryId: wixossCategory._id } },
        upsert: true,
      },
    }))
  );
};
