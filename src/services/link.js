const Link = require("../models/Link");
const User = require("../models/User");

class LinkService {
  async create(linkData) {
    const linkRecord = await Link.create(linkData);

    await User.updateOne(
      { _id: linkRecord.creator.userId },
      {
        $push: {
          created_links: {
            linkId: linkRecord._id,
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

  async findOne(searchQuery, selectedField) {
    return await Link.findOne({ ...searchQuery, removed: false }, selectedField);
  }

  async updateOne(searchQuery, updateQuery) {
    return await Link.updateOne({ ...searchQuery, removed: false }, updateQuery);
  }

  async addRedirectData(searchQuery, redirect_data) {
    await Link.updateOne(searchQuery, {
      $inc: {
        total_click: 1,
      },
      $push: {
        redirect_data,
      },
    });
  }
}

module.exports = new LinkService();
