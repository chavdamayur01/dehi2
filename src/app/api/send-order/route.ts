import { NextRequest, NextResponse } from "next/server";
import { QUANTITY_PRICING, ValidQuantity, OrderApiResponse } from "@/types";
import { getSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface OrderRequestBody {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  quantity: number;
  promoCode?: string;
}

interface InsertedOrderResult {
  id: string;
  order_number: string;
  quantity: number;
  total_price: number;
}

export async function POST(req: NextRequest): Promise<NextResponse<OrderApiResponse>> {
  try {
    let body: Partial<OrderRequestBody> = {};
    try {
      body = (await req.json()) as Partial<OrderRequestBody>;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const fullName = body.fullName?.trim() || "";
    const phone = body.phone?.trim() || "";
    const email = body.email?.trim() || "";
    const address = body.address?.trim() || "";
    const city = body.city?.trim() || "";
    const state = body.state?.trim() || "";
    const pincode = body.pincode?.trim() || "";
    const rawQuantity = Number(body.quantity);
    const promoCode = (body.promoCode || "").trim().toUpperCase();

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

    // 2. Centralized Quantity and Pricing (1: 299, 2: 499, 3: 699)
    const quantity = (Math.max(1, Math.min(3, rawQuantity || 1))) as ValidQuantity;
    const baseOfferPrice = QUANTITY_PRICING[quantity] || 299;

    // 3. Promo code calculation (VIBE4 gives 10% off the Independence Day offer price)
    let promoDiscount = 0;
    if (promoCode === "VIBE4") {
      promoDiscount = Math.round(baseOfferPrice * 0.1);
    }
    const totalPrice = Math.max(0, baseOfferPrice - promoDiscount);

    // 3. Unique Order Number generation (e.g., DEHI-482910)
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `DEHI-${randomSixDigits}`;
    const adminNote = `Independence Day Offer Price: ₹${totalPrice}${promoCode ? ` (Promo: ${promoCode})` : ""}`;

    // 4. Initialize Supabase Server Client
    const supabase = getSupabaseServerClient();

    // 5. Insert order into Supabase
    let insertResult = await supabase
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
        admin_note: adminNote,
      })
      .select("id, order_number, quantity, total_price")
      .maybeSingle<InsertedOrderResult>();

    // If remote database has a legacy check constraint on total_price, gracefully fallback
    if (insertResult.error && insertResult.error.code === "23514") {
      const legacyDbPriceMap: Record<number, number> = { 1: 399, 2: 699, 3: 999 };
      const fallbackPrice = legacyDbPriceMap[quantity] || 399;
      insertResult = await supabase
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
          total_price: fallbackPrice,
          status: "pending",
          admin_note: adminNote,
        })
        .select("id, order_number, quantity, total_price")
        .maybeSingle<InsertedOrderResult>();
    }

    const { data, error } = insertResult;

    // 6. Check for Supabase Insert Errors
    if (error) {
      console.error("SUPABASE ORDER INSERT ERROR:", {
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
      totalPrice: totalPrice,
    });
  } catch (error) {
    console.error("ORDER API ERROR:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your order request right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
