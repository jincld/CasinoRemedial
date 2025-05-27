import { Schema, model } from "mongoose";

const juegosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,  
    },
    categoria: { 
      type: String,
      required: true,  
    },
    apuestaminima: {
      type: Number,
      required: true,
      min: 0,  
    },
    apuestamaxima: {
      type: Number,
      required: true,
      min: 0,  
    },
  },
  {
    timestamps: true,  
    strict: true,  
  }
);

export default model("Juegos", juegosSchema);