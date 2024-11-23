const router = require("express").Router();

const authRoutes = require("./authRoutes");
const defaultRoutes = require("./defaultRoutes");
const uploadRoutes = require("./uploadRoutes");
const fileRoutes = require("./fileRoutes");

router.use(authRoutes);
router.use(defaultRoutes);
router.use(uploadRoutes);
router.use(fileRoutes);

module.exports = router;
