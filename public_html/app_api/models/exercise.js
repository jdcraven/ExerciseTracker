var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true
    },
    exerciseName: {type:String},
    exerciseType: {type: String, required: true},
    exerciseWeight: {type: Number},
    numberSets: {type: Number},
    machineSettings: {type: String},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

//var runningSchema = new mongoose.Schema({
////    UserID: {
////        type: String,
////        required: true
////    },
//    ExerciseID: {
//       type: String,
//       required: true
//   },
//    Distance: {
//        type: Number,
//        required: true
//    },
//    Time: {
//        type: Number,
//        required: true
//    },
//    createdOn: {
//        type: Date,
//        "default": Date.now
//    }    
//});

//var weightliftingSchema = new mongoose.Schema({
////   UserID: {
////     type: String,
////     required: true
////   },
//   ExerciseID: {
//       type: String,
//       required: true
//   },
//   Weight: {
//       type: Number,
//       required: true
//   },
//   Set: {
//       type: Number,
//       required: true
//   },
//   createdOn: {
//       type: Date,
//       "default": Date.now
//   }   
//});
//
//var machineExercise = new mongoose.Schema({
////   UserID: {
////       type: String,
////       required: true
////   },
//   ExerciseID: {
//       type: String,
//       required: true
//   },
//   machineSettings: {
//       type: String,
//       required: true
//   },
//   weight: {
//       type: Number,
//       required: true
//   },
//   Set: {
//       type: Number,
//       required: true
//   },
//   CreatedOn: {
//       type: Date,
//       "default": Date.now
//   }
//});


/* This model will also create the collection in the Loc8r database when used */
var Exercise = mongoose.model('Exercise', exerciseSchema);
//var WeightLifting = mongoose.model('WeightLifting', weightliftingSchema);
