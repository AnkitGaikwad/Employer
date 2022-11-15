const Employer = require('../models/employer');
const Employee = require('../models/employee');
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

//using callback to update data
const updateEmployer = (req, res) => {
    const email = req.user.userId;
    Employer.find({Email: email}, (err, data) => {
        if (err) return handleError(err);
        Employer.findByIdAndUpdate({_id: data[0]._id}, req.body, {new: true, runValidators: true},(err1, data1) => {
            if (err1) return res.status(500).send(err1);
            res.status(200).json({"Welcome : ": data[0].Name, data: data1});
        });
    });
};

//using async to update data
// const updateEmployer = async (req, res) => {
//     try {
//         const email = req.user.userId;
//         const id = await Employer.find({Email: email});
//         const employer = await Employer.findByIdAndUpdate({_id: id[0]._id}, req.body, {new: true, runValidators: true});
//         res.status(200).json({"Welcome : ": id[0].Name, data: employer});
//     } catch (err) {
//         res.status(404).send("Error updating employer");
//     }
// };

//using callback to create employee
const createEmployee = (req, res) => {
    const email = req.user.userId;
    Employer.find({Email: email}, (err, data) => {
        if (err) return handleError(err);
        const employee = req.body;
        employee.Password = 'temp123';
        employee.Company = data[0].Company;
        Employee.create(employee, (err1, data1) => {
            if (err1) return handleError(err1);
            res.status(200).json(data1);
        });
    });
};

//using async to create employee
// const createEmployee = async (req, res) => {
//     try {
//         const email = req.user.userId;
//         const id = await Employer.find({Email: email});
//         const employee = req.body;
//         employee.Password = 'temp123';
//         employee.Company = id[0].Company;
//         const employeeFinal = await Employee.create(employee);
//         res.status(200).json(employeeFinal);
//     } catch (err) {
//         res.status(404).send("Error creating employee");
//     }
// };

module.exports = {
    loginEmployers,
    updateEmployer,
    registerEmployers,
    createEmployee
};