import axios from "axios";
import ClassModel from "../../models/class";
import CategoryModel from "../../models/category";
export const scrappeWixossClasses = async (endpoint) => {
  const wixossCategory = await CategoryModel.findOne({
    where: {
      name: "wixoss",
    },
  });

  const { data } = await axios.get(endpoint);

  return await ClassModel.bulkWrite(
    data.items.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: { ...item, categoryId: wixossCategory._id } },
        upsert: true,
      },
    }))
  );
};
