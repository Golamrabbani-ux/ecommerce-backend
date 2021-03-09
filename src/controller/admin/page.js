const Page = require('../../models/page');
const User = require('../../models/auth');

exports.page = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user.role === "admin") {
                const { banners } = req.files;
                if (banners.length > 0) {
                    req.body.banners = banners.map((banner) => ({
                        img: banner.filename,
                    }))
                }
                req.body.createdBy = req.user._id;
                res.status(201).json({body: req.body})
                Page.findOne({ category: req.body.category })
                    .exec((err, page) => {
                        if (err) return res.status(200).json({ err });
                        else if (page) {
                            Page.findOneAndUpdate({ category: req.body.category }, req.body)
                                .exec((_err, updatePage) => {
                                    if (_err) return res.status(200).json({ _err });
                                    return res.status(201).json({ updatePage })
                                })
                        }
                        else {
                            const page = new Page(req.body)
                            page.save((_error, page) => {
                                if (_error) return res.status(400).json({ _error });
                                res.status(201).json({ page })
                            })
                        }
                    })
            }
            else {
                return res.status(400).json({ message: "Admin access only" })
            }
        })
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
