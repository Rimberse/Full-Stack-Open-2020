const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    date: { 
      type: Date,
      required: true
    },
    important: Boolean
})

// Alters toJSON method on the schema, to delete the field _id and __v, which isn't used by the frontend
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();      // even though _id looks a String, it's actually an object, hence the conversion
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);
