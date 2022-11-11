const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(allCategories);
  } catch {
    (err) => res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json(oneCategory);
  } catch {
    (err) => res.json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch {
    (err) => res.json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.findByPk(req.params.id);
    const newCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(newCategory);
    if (!categoryData) {
      res.status(404).json({ message: "Could not find:" + req.params.id });
      return;
    }
  } catch {
    (err) => res.json(err);
  }
});
// router.delete("/:id", (req, res) => {
//   // delete a category by its `id` value

module.exports = router;
