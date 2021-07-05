const got = require("got");
const crypto = require("crypto");
const validURL = require("valid-url");

// Link Validation
const { linkCreate, linkCode } = require("../../validation/link.schema");
// Link Service
const LinkService = require("../../services/link");

const getUserAgent = require("../../utils/getUserAgent");

const create = async (req, res) => {
  const validation = linkCreate.validate(req.query);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  if (!validURL.isWebUri(validation.value.link)) {
    return res.code(400).send({
      statusCode: 400,
      message: "Must be a valid url",
    });
  }

  const link_code = crypto.randomBytes(4).toString("hex");
  const linkDTO = { ...validation.value, link_code, creator: { userId: req.user.id } };
  const { statusCode, message, url } = await LinkService.create(linkDTO);

  return res.code(statusCode).send({ statusCode, message, url });
};

const remove = async (req, res) => {
  const validation = linkCode.validate(req.params);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const { link_code } = validation.value;
  const linkData = await LinkService.findOne(
    { "creator.userId": req.user.id, link_code },
    { _id: 1 }
  );

  if (!linkData) {
    return res.code(404).send({
      statusCode: 404,
      message: "Link not found",
    });
  }

  await LinkService.updateOne({ "creator.userId": req.user.id, link_code }, { removed: true });
  return res.code(200).send({ statusCode: 200, message: "OK" });
};

const getRedirectLink = async (req, res) => {
  const validation = linkCode.validate(req.params);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const user_agent = req.headers["user-agent"];
  const { link_code } = validation.value;
  const linkData = await LinkService.findOne({ link_code }, { link: 1 });

  if (!linkData) {
    return res.code(404).send({
      statusCode: 404,
      message: "Link not found",
    });
  }

  const apiURL = `http://ip-api.com/json/${req.ip}?fields=status,country,city`;
  const body = await got(apiURL).json();
  const location = body.status === "success" ? { country: body.country, city: body.city } : {};
  const referrer = req.headers["referrer"];
  const redirect_data = { referrer, location, ...getUserAgent(user_agent) };

  LinkService.addRedirectData({ link_code }, redirect_data);

  return res.redirect(302, linkData.link);
};

const getStatistic = async (req, res) => {
  const validation = linkCode.validate(req.params);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const { link_code } = validation.value;
  const selectField = { _id: 0, __v: 0, creator: 0, updatedAt: 0, "redirect_data._id": 0 };
  const statistic = await LinkService.findOne(
    { "creator.userId": req.user.id, link_code },
    selectField
  );

  if (!statistic) {
    return res.code(404).send({
      statusCode: 404,
      message: "Link not found",
    });
  }

  return res.code(200).send(statistic);
};

module.exports = { create, remove, getStatistic, getRedirectLink };
