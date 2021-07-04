const Link = require("../models/Link");
const User = require("../models/User");

class LinkService {
  async create(linkData) {
    const linkRecord = await Link.create(linkData);

    User.updateOne(
      { _id: linkRecord.creator.userId },
      {
        $push: {
          created_links: {
            URL: linkRecord.link,
          },
        },
      }
    );

    return {
      statusCode: 200,
      message: "OK",
      url: `https://link-kisalt.herokuapp.com/${linkRecord.link_code}`,
    };
  }

  async findOne(link_code, select) {
    return await Link.findOne(link_code, select);
  }

  async addRedirectData(link_code, data) {
    await Link.updateOne(link_code, {
      $inc: {
        total_click: 1,
      },
      $push: {
        redirect_data: data,
      },
    });
  }
}

module.exports = new LinkService();
