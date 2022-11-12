const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.status(200).json(allTags);
  } catch {
    (err) => res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag },
    });
    res.status(200).json(oneTag);
  } catch {
    (err) => res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    (err) => res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.findByPk(req.params.id);
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateTag);
    if (!tagData) {
      res.status(404).json({ message: "Could not find:" + req.params.id });
      return;
    }
  } catch {
    (err) => res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: "Could not find:" + req.params.id });
      return;
    }
    res.status(200).json(deletedTag);
  } catch {
    (err) => res.json(err);
  }
});

module.exports = router;
