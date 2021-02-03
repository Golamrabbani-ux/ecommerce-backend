const Category = require('../models/category');
const slugify = require('slugify');
const User = require('../models/auth')

exports.addCategory = (req, res) => {
    // console.log("req.body", req.body);
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (user.role === 'admin') {
                // Product Create Admin Only
                const categoryObj = {
                    name: req.body.name,
                    slug: slugify(req.body.name)
                }
                if (req.body.parentId) {
                    categoryObj.parentId = req.body.parentId
                }
                if (req.file) {
                    categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
                }
                const cat = new Category(categoryObj)
                cat.save((error, category) => {
                    if (error) return res.status(400).json({ error })
                    if (Category) {
                        return res.status(201).json({ category })
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Admin access only" })
            }
        })
}

exports.updateCategory = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updateCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] !== "") {
                category.parentId = parentId[i]
            }
            const updateCategory = await Category.findByIdAndUpdate({ _id: _id[i] }, category, { new: true });
            updateCategories.push(updateCategory);
        }
        res.status(200).json({ updateCategories })
    }
    else {
        const category = {
            name,
            type
        }
        if (parentId !== "") {
            category.parentId = parentId
        }
        const updateCategory = await Category.findByIdAndUpdate({ _id }, category, { new: true });
        updateCategories.push(updateCategory)
        res.status(200).json({ updateCategories })
    }
}

exports.deleteCategories = async(req, res) =>{
    const {ids} = req.body.payload;
    const deleteCategoriesList = [];
    for(let i = 0; i<ids.length; i++){
        const deleteCategory = await Category.findByIdAndDelete({_id: ids[i]._id});
        deleteCategoriesList.push(deleteCategory)
    }
    if(deleteCategoriesList.length === ids.length){
        res.status(201).json({message: "Categories remeved successfully"})
    }
}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) return res.status(400).json({ error });
            if (categories) {
                const cateList = createCategories(categories)
                // console.log("cat", cateList);
                return res.status(200).json({ cateList })
            }
        })
}

exports.categoryOption = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user.role === "admin") {
                Category.find({})
                    .exec((err, cat) => {
                        if (err) return res.status(400).json({ err });
                        res.status(200).json({ cat })
                    })
            }
            else {
                return res.status(400).json({ message: "Admin access only" })
            }
        })
}





function createCategories(categories, parentId = null) {
    let categoriesList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoriesList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id),
        });
    }
    return categoriesList
}