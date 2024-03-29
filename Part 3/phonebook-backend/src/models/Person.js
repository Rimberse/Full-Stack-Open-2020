const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.connect(url)
    .then(result => console.log("Connected to MongoDB"))
    .catch(error => console.log(`Error connecting to MongoDB: ${error.message}`));

const personSchema = new mongoose.Schema({
    // ex. 3.19
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    // ex. 3.20
    number: {
        type: String,
        minLength: 3,
        validate: {
            validator: v => {
              return /\d{2,3}?-\d{7}?/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);
