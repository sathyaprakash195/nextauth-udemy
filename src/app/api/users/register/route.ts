import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/sendEmail";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists
    const user = await User.findOne({ email: reqBody.email });
    if (user) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // create user

    const newUser = new User(reqBody);
    const newUserResponse = await newUser.save();

    // send email verification
    await sendEmail({
      email: newUser.email,
      emailType: "emailVerification",
      userId: newUserResponse._id,
    });

    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
