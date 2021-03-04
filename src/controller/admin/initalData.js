const Category = require('../../models/category');
const Product = require('../../models/product');

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id productName productPictures quantity slug price description category")
    .populate({ path: "category", select: "_id name" })
    .exec()
    console.log(products);
  res.status(200).json({
    categories: createCategories(categories),
    products
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
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoriesList
}