const Employer = require('../models/employer');
const jwt = require('jsonwebtoken');

//using callback for logining employer
const loginEmployers = (req, res) => {
    const { Email, Password } = req.body;
    Employer.find({Email: req.body.Email, 
        Password: req.body.Password}, (err, data) => {
        if (err) return handleError(err);

        const token = jwt.sign({Email, Password}, process.env.JWT_SECRET, {expiresIn: '30d'});
        console.log(token);
        res.status(200).json(token);
    });
}

//using async for logining employer
// const loginEmployers = async (req, res) => {
//     try {
//         const employer = await Employer.find({Email: req.body.Email, 
//             Password: req.body.Password});
//         res.status(200).json(employer);
//     } catch (error) {
//         res.status(404).send("Error logging employer");
//     }
// };

//using callback to save data
const registerEmployers = (req, res) => {
    Employer.create(req.body, (err, data) => {
        if (err) return handleError(err);
        res.status(200).json(data);
    });   
}

//using async to save data
// const registerEmployers = async (req, res) => {
//     try {
//         const employer = await Employer.create(req.body);
//         res.status(200).send(employer);
//     } catch (error) {
//         res.status(404).send("Error saving employer");
//     }
// }

const updateEmployer = (req, res) => {
    console.log(req.user.userId);
    const email = JSON.stringify(req.body.userId);
    console.log(typeof(email));
    Employer.find({Email: email, Password: req.body.Password}, (err, data) => {
        if (err) return handleError(err);
        console.log(data);
    });
    //Employer.findByIdAndUpdate();
    res.send("Welcome : " + JSON.stringify(req.user.userId));
};

module.exports = {
    loginEmployers,
    updateEmployer,
    registerEmployers
};