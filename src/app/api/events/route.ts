import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  try {
    const bookings = dataStore.getEventBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch event bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.phone || !body.eventType || !body.preferredDate) {
      return NextResponse.json(
        { success: false, message: "Missing required booking details" },
        { status: 400 }
      );
    }

    const booking = dataStore.createEventBooking({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      eventType: body.eventType,
      preferredDate: body.preferredDate,
      alternateDate: body.alternateDate,
      startTime: body.startTime || "14:00",
      endTime: body.endTime || "20:00",
      guestCount: Number(body.guestCount) || 50,
      cateringOption: body.cateringOption || "BUFFET",
      spacePreference: body.spacePreference || "MAIN_HALL",
      additionalNotes: body.additionalNotes,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create event booking" },
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
        { success: false, message: "Booking ID and status are required" },
        { status: 400 }
      );
    }
    const updated = dataStore.updateBookingStatus(id, status);
    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
