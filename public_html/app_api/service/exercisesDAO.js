
var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');


function exercisesReadAll() {
    
    var promise = new Promise(function (resolve, reject) { 
            Exercise
            .find()
            .exec(function(err, results){
                if ( err ) {
                    reject(err);                    
                } else {
                    results = fixExerciseData(results);
                    resolve(results);
                }
            });           

    });
    
    return promise;
       
    
}

function exercisesReadOne(id) {
    
    var promise = new Promise(function (resolve, reject) { 
        
        if ( !id ) {
             reject('Exercise ID not found'); 
        }
            Exercise
            .findById(id)
            .exec(function(err, results){
                if ( err ) {
                    reject(err);                    
                } else {
                    results = fixData(results);
                    resolve(results);
                }
            });           

    });
    
    return promise;
       
    
}

function fixExerciseData(results) {
    
    var finalData = [];    
    results.forEach(function(doc) {
        finalData.push(fixData(doc));        
    });
    return finalData;
}

function fixData(doc) {
    
    var createdDate = new Date(doc.createdOn).toJSON().slice(0,10);    
    return {
        "_id" : doc._id,
        "exerciseName" : doc.exerciseName,
        "exerciseType" : doc.exerciseType,
        "exerciseWeight": doc.exerciseWeight,
        "numberSets": doc.numberSets,
        "machineSettings": doc.machineSettings,
        "createdOn" : createdDate.replace(/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/, "$2/$3/$1")
    };
    
}



module.exports.exercisesReadAll = exercisesReadAll;
module.exports.exercisesReadOne = exercisesReadOne;

