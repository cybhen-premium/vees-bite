import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  try {
    const orders = dataStore.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.customerPhone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required order information" },
        { status: 400 }
      );
    }

    const order = dataStore.createOrder({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      orderType: body.orderType || "DELIVERY",
      deliveryAddress: body.deliveryAddress,
      deliveryArea: body.deliveryArea,
      notes: body.notes,
      paymentMethod: body.paymentMethod || "MOMO",
      paymentStatus: body.paymentStatus || "PENDING",
      status: "PENDING",
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      deliveryFee: Number(body.deliveryFee) || 0,
      totalAmount: Number(body.totalAmount) || 0,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required" },
        { status: 400 }
      );
    }
    const updated = dataStore.updateOrderStatus(id, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update order status" },
      { status: 500 }
    );
  }
}
