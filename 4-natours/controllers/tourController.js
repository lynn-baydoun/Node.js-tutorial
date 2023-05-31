//const fs = require('fs');
const Tour = require('./../models/tourModel');

//this was just used for testing purposes before creating the database
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//param middleware always has a 4th parameter val
// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async(req, res) => {
    try {
        //the three dots take all the fields out of the object
        //we created a copy of the object as to not delete any of the fields inside the object
        const queryObj = {...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        //we need to remove these fields out of the queryObj so we loop through them
        excludedFields.forEach((el) => delete queryObj[el]);

        const tours = await Tour.find(queryObj);

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async(req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        //Tour.findOne({_id: req.params.id}) = tour.findById it makes it easier it is a shorthand
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
    //turning it into an integer
    //const id = req.params.id * 1;
    // //404 error if the id doesn't exist
    // if (!tours) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //     });
    // }
    //exports.tour = tours.find((el) => el.id === id);
    //   const tour = tours.find((el) => el.id === id);
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour,
    //   },
    //   });
};

exports.createTour = async(req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        //console.log(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
    // if (req.params.id * 1 > tours.length) {
    //   return res.status(404).json({
    //     status: 'fail',
    //     message: 'Invalid ID',
    //   });
    // }
};

exports.deleteTour = async(req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
};