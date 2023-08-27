import axios from "axios";
import CardModel from "../../models/card";
import CategoryModel from "../../models/category";
export const scrappeShadowverseCards = async (setname) => {
  let cardList = [];
  const tcgName = "Shadowverse";
  const category = await CategoryModel.findOne({
    name: tcgName,
  });

  const { data } = await axios.get(
    `https://shadowcard.io/api/search.php?database&pack=${setname}&sort=name&limit=250&offset=0`
  );

  data.card.forEach((element, idx) => {
    element.card_no = data.card[idx].id;
    element.category_id = category._id;
    element.tcg = tcgName;
    element.set_name = setname;
    element.card_type = data.card[idx].type;
    element.description = data.card[idx].ability;
    element.content = data.card[idx].stats;
    element.fllabor_text = data.card[idx].trait;
    element.flg = data.card[idx].class;
    element.image = `https://images.shadowcard.io/images/cards/${element.id}.jpg`;
    cardList.push(element);
  });

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
