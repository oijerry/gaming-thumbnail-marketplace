import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";
import User from "@/models/User";
import Template from "@/models/Template";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      role: string;
    };

    if (decoded.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access Denied",
        },
        {
          status: 403,
        }
      );
    }

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalTemplates =
      await Template.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "Pending",
      });

    const completedOrders =
      await Order.countDocuments({
        status: "Completed",
      });

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);

    return NextResponse.json({
      success: true,

      totalOrders,

      totalUsers,

      totalTemplates,

      pendingOrders,

      completedOrders,

      revenue:
        revenue.length > 0
          ? revenue[0].total
          : 0,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}