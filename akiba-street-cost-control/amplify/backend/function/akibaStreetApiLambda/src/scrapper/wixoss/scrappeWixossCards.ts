import axios from "axios";
import { delay } from "../../utils/delay";
import CardModel from "../../models/card";
import CategoryModel from "../../models/category";
export const scrappeWixossCards = async (endpoint) => {
  let cardList = [];
  const wixossCategory = await CategoryModel.findOne({
    name: "wixoss",
  });

  const { data } = await axios.get(endpoint);

  const pages = data.count / data.items.length;

  for (let i = 0; i < Math.round(pages); i++) {
    const newUrl = endpoint.replace(`p=0`, `p=${i}`);

    const {
      data: { items },
    } = await axios.get(newUrl);

    items.forEach((element) => {
      element.category_id = wixossCategory._id;
      element.tcg = `wixoss`;
      element.image = `https://www.takaratomy.co.jp/products/en.wixoss/card/thumb/${element.card_no}.jpg`;
      cardList.push(element);
    });
    await delay(2000);
  }

  return await CardModel.bulkWrite(
    cardList.map((card) => ({
      updateOne: {
        filter: { card_no: card.card_no },
        update: { $set: card },
        upsert: true,
      },
    }))
  );
};
