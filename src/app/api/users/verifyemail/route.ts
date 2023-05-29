import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Token from "@/models/tokenModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const token = reqBody.token;
    const tokenObj: any = await Token.findOne({ token });
    const userId = tokenObj.userId;
    await User.updateOne({ _id: userId }, { isEmailVerified: true });
    return NextResponse.json({
      message: "Email verified successfully",
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
