import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  try {
    const enquiries = dataStore.getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const enquiry = dataStore.createEnquiry({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject || "General Enquiry",
      message: body.message,
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to send enquiry" },
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
        { success: false, message: "Enquiry ID and status are required" },
        { status: 400 }
      );
    }
    const updated = dataStore.updateEnquiryStatus(id, status);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}
