export const dynamic = "force-dynamic";

import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/dbConfig";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "Users get request accessed successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
