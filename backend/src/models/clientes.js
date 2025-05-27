import { Schema, model } from "mongoose";

const clienteSchema = new Schema(
  {
    email: {
      type: String,
      required: true,  
    },
    password: { 
      type: String,
      required: true,  
    },
    edad: {
      type: Number,
      required: true,
      min: 0,  
    },
    paisresidencia: {
        type: String,
        required: true,  
    },
  },
  {
    timestamps: true,  
    strict: true,  
  }
);

export default model("Clientes", clienteSchema);