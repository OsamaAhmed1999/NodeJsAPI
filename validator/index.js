exports.userSignupValidator = (req, res, next) => {

    req.check("Name", "Name is required").notEmpty();

    req.check("Email", "Email must be 3 to 32 characters").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @ ex: abc@mail.com")
    .isLength({
        min: 6,
        max: 32
    })

    req.check("User_id", "User Id is Required").notEmpty()

    req.check("Password", "Password is required").notEmpty();
    req.check("Password")
    .isLength({min: 8})
    .withMessage("Password must contain 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    next();
}