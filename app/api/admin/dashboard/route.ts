import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Order from "@/models/Order";
import Template from "@/models/Template";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalTemplates = await Template.countDocuments();

    const completedOrders = await Order.countDocuments({
      status: "Completed",
    });

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
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

    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    return NextResponse.json({
      success: true,

      totalUsers,

      totalOrders,

      totalTemplates,

      completedOrders,

      pendingOrders,

      totalRevenue:
        revenue.length > 0
          ? revenue[0].total
          : 0,

      recentOrders,
    });

  } catch (error: any) {

    console.error(error);

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