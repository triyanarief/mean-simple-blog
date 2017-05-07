module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/mean-blog');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);

    return model;
};
