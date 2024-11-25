const router = require("express").Router();

const userController = require("../controller/userAPI");
const bookController = require("../controller/bookAPI");


router.get("/allUser", userController.allUser);
router.post("/register", userController.registerUser);
router.post("/updateUser", userController.updateUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.get("/logedinuser", userController.userDetails);
router.get("/userDetail/:id", userController.userDetail);

router.post("/addBook", bookController.addBook);
router.get("/allBook", bookController.getAllBooks);
router.get("/search/:id", bookController.searchBooks);
router.post("/addToCart", bookController.addToCart);
router.post("/checkout", bookController.checkout);
router.post("/returnBooks", bookController.returnBooks);
router.post("/removeFromCart", bookController.removeFromCart);
router.get("/filter/:genre/:year/:title", bookController.filter);
router.get("/booksInCart/:username", bookController.booksInCart);
router.get("/borrowedBooks", bookController.borrowedBooks);


module.exports = router;