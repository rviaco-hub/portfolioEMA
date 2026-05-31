import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: String,
  type: { type: String, enum: ['equipo', 'repuesto', 'accesorio', 'consumible'] }
});

export default model('Category', CategorySchema);
