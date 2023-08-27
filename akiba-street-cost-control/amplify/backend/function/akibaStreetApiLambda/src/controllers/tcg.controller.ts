import { NextFunction, Request, Response } from "express";

import { scrappeWixossCards } from "../scrapper/wixoss/scrappeWixossCards";
import { scrappeShadowverseCards } from "../scrapper/shadowverse";
import { scrappeWixossRarities } from "../scrapper/wixoss/scrappeWixossRarities";
import { scrappeShadowverseRarities } from "../scrapper/shadowverse/scrappeShadowverseRarities";
import cardSchema from "../models/card";
import raritySchema from "../models/rarities";
import categorySchema from "../models/category";

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  const { page, size } = req.params;
  try {
    const { team, rarity, selectedClass, types, product_type, tcg } = req.query;

    const options = {
      page: page,
      limit: size,
      sort: { _id: -1 },
    };

    let query: any = { tcg: { $regex: `^${tcg}$`, $options: "i" } };

    team ? (query.master = team) : "";
    rarity ? (query.rarity = rarity) : "";
    selectedClass ? (query.LRIG_SIGNI_type = selectedClass) : "";
    types ? (query.card_type = types) : "";
    product_type ? (query.product_type = product_type) : "";

    const cards = await cardSchema.paginate({ ...options, query });

    res.status(200).send({
      status: "success",
      message: "Products found",
      data: cards,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateWixossCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { endpoint } = req.body;
  try {
    await scrappeWixossCards(endpoint);

    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "done",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateShadowverseCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { setname } = req.body;
  try {
    await scrappeShadowverseCards(setname);

    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "done",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateCardsPrices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rarity, buyPrice, sellPrice, category, stock } = req.params;

  await cardSchema.updateMany(
    { rarity: { $regex: rarity, $options: "i" }, tcg: category },
    {
      $set: {
        stock: parseInt(stock),
        prices: [
          {
            buyPrice,
            sellPrice,
            mode: "single_card",
            currency: "mxn",
          },
        ],
      },
    }
  );

  try {
    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "done",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateWixossRarities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { endpoint } = req.body;

  try {
    await scrappeWixossRarities(endpoint);

    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "done",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateShadowverseRarities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { endpoint } = req.body;

  try {
    await scrappeShadowverseRarities(endpoint);

    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "done",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const getRariritiesByTCG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tcg } = req.params;
  try {
    let query: any = { name: { $regex: `^${tcg}$`, $options: "i" } };
    const category = await categorySchema.findOne({ ...query });

    const rarities = await raritySchema.find({ categoryId: category._id });

    res.status(200).send({
      status: "success",
      message: "Rarirties found",
      data: rarities,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

const updateSingleCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, ...args } = req.body;

  try {
    await cardSchema.findByIdAndUpdate(id, {
      ...args,
    });

    return res.status(200).send({
      status: "success",
      model: "TCG",
      response: "Card updated succesfully",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "TCG",
      error: error,
    });
  }
};

export default {
  updateShadowverseCards,
  updateWixossCards,
  updateShadowverseRarities,
  getCards,
  updateCardsPrices,
  updateWixossRarities,
  getRariritiesByTCG,
  updateSingleCard,
};
