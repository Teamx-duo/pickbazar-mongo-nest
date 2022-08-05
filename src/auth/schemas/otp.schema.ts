import * as mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema(
  {
    phone_number: { type: String, required: true },
    otpCode: { type: String, required: true },
  },
  { timestamps: true, expireAfterSeconds: 180 },
);
