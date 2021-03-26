const Page = require('../../models/page');
const User = require('../../models/auth');

exports.page = (req, res) => {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
      req.body.banners = banners.map((banner, index) => ({
        img: banner.filename
      }));
    }

    req.body.createdBy = req.user._id;

    Page.findOne({ category: req.body.category }).exec((error, page) => {
      if (error) return res.status(400).json({ error });
      if (page) {
        Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
          (error, updatedPage) => {
            if (error) return res.status(400).json({ error });
            if (updatedPage) {
              return res.status(201).json({ page: updatedPage });
            }
          }
        );
      } else {
        const page = new Page(req.body);
  
        page.save((error, page) => {
          if (error) return res.status(400).json({ error });
          if (page) {
            return res.status(201).json({ page });
          }
        });
      }
    });
}

exports.getPage = (req, res) => {
    const { category, type } = req.params;
    if (type === 'page') {
        Page.findOne({ category: category }).exec((err, page) => {
            if (err) return res.status(400).json({ err });
            return res.status(200).json({ page })
        })
    }
}
