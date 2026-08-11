import { NextRequest, NextResponse } from "next/server";
import { QUANTITY_PRICING, ValidQuantity, OrderApiResponse } from "@/types";
import { getSupabaseServerClient } from "@/lib/supabase";

interface OrderRequestBody {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  quantity: number;
}

interface InsertedOrderResult {
  id: string;
  order_number: string;
  quantity: number;
  total_price: number;
}

export async function POST(req: NextRequest): Promise<NextResponse<OrderApiResponse>> {
  try {
    const body = (await req.json()) as Partial<OrderRequestBody>;

    const fullName = body.fullName?.trim() || "";
    const phone = body.phone?.trim() || "";
    const email = body.email?.trim() || "";
    const address = body.address?.trim() || "";
    const city = body.city?.trim() || "";
    const state = body.state?.trim() || "";
    const pincode = body.pincode?.trim() || "";
    const rawQuantity = Number(body.quantity);

    // 1. Customer details validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!address || address.length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid delivery address." },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        { success: false, error: "City is required." },
        { status: 400 }
      );
    }

    if (!state) {
      return NextResponse.json(
        { success: false, error: "State is required." },
        { status: 400 }
      );
    }

    const cleanPincode = pincode.replace(/\D/g, "");
    if (!/^\d{6}$/.test(cleanPincode)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit Indian PIN code." },
        { status: 400 }
      );
    }

    // 2. Fixed Quantity and Pricing (1: 399, 2: 699, 3: 999)
    const quantity = (Math.max(1, Math.min(3, rawQuantity || 1))) as ValidQuantity;
    const totalPrice = QUANTITY_PRICING[quantity] || 399;

    // 3. Unique Order Number generation (e.g., DEHI-482910)
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `DEHI-${randomSixDigits}`;

    // 4. Initialize Supabase Server Client
    const supabase = getSupabaseServerClient();

    // 5. Insert order into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        full_name: fullName,
        phone: cleanPhone,
        email: email,
        address: address,
        city: city,
        state: state,
        pincode: cleanPincode,
        product_name: "Dehi Body Wash",
        product_size: "200 mL",
        quantity: quantity,
        total_price: totalPrice,
        status: "pending",
      })
      .select("id, order_number, quantity, total_price")
      .maybeSingle<InsertedOrderResult>();

    // 6. Check for Supabase Insert Errors
    if (error) {
      console.error("Supabase order insert failed:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Unable to save your order right now. Please try again.",
        },
        { status: 500 }
      );
    }

    // 7. Return success response with order information
    return NextResponse.json({
      success: true,
      orderId: data?.id || orderNumber,
      orderNumber: data?.order_number || orderNumber,
      quantity: data?.quantity || quantity,
      totalPrice: data?.total_price || totalPrice,
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your order request right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
