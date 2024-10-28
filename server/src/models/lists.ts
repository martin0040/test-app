import { InferSchemaType, model, Schema } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    icon: { type: String },
    link: { type: String },
  },
  {
    timestamps: true,
  }
);

type List = InferSchemaType<typeof listSchema>;

export default model<List>('List', listSchema);
