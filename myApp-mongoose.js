/** 1) Install & Set up mongoose */
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** 2) Create a 'Person' Model */
const Schema = mongoose.Schema;
var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
var Person = mongoose.model('Person', personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = function (done) {
  const vadym = new Person({
    name: 'Vadym',
    age: 28,
    favoriteFoods: ['fried potatoes', 'pelmeni'],
  });

  vadym.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};
/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  { name: 'Vincent', age: 25, favoriteFoods: ['sushi'] },
  { name: 'Leo', age: 15, favoriteFoods: ['roast chicken'] },
  { name: 'Eva', age: 30, favoriteFoods: ['wine'] },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
/** 5) Use `Model.find()` */
var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};
/** 6) Use `Model.findOne()` */
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 7) Use `Model.findById()` */
var findPersonById = function (personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 8) Classic Update : Find, Edit then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};
/** 9) New Update : Use `findOneAndUpdate()` */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};
/** 10) Delete one Person */
var removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};
/** 11) Delete many People */
const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};
/** 12) Chain Query helpers */

var queryChain = function (done) {
  var foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      err ? done(err) : done(null, data);
    });
};

//---------------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
