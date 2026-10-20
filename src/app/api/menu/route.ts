import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  try {
    const items = dataStore.getMenuItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newItem = dataStore.addMenuItem({
      name: body.name,
      description: body.description || "",
      price: Number(body.price),
      category: body.category,
      imageUrl: body.imageUrl || "/images/jollof_chicken.jpg",
      available: body.available !== undefined ? body.available : true,
      spicy: Boolean(body.spicy),
      popular: Boolean(body.popular),
      prepTimeMinutes: Number(body.prepTimeMinutes) || 20,
    });
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Menu item ID is required" },
        { status: 400 }
      );
    }
    const updated = dataStore.updateMenuItem(id, updates);
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }
    dataStore.deleteMenuItem(id);
    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
