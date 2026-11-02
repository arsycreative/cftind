import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/db";

export async function GET(request) {
  const start = Date.now();

  try {
    const configured = isSupabaseConfigured();

    if (!configured) {
      return NextResponse.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: {
          configured: false,
          type: "local_dev",
          latency_ms: Date.now() - start,
          active: true,
        },
        message: "Running in local development mode (Supabase not configured)",
      });
    }

    const supabase = await getSupabase();
    if (!supabase) {
      return NextResponse.json(
        {
          status: "unhealthy",
          timestamp: new Date().toISOString(),
          error: "Failed to initialize Supabase client",
        },
        { status: 500 }
      );
    }

    // Ping Supabase PostgreSQL with a real query to register activity and prevent pause
    const { data, error } = await supabase
      .from("instruments")
      .select("id")
      .limit(1);

    const latency = Date.now() - start;

    if (error) {
      return NextResponse.json(
        {
          status: "degraded",
          timestamp: new Date().toISOString(),
          database: {
            configured: true,
            type: "supabase_live",
            latency_ms: latency,
            active: false,
            error: error.message,
          },
          message: "Database query returned an error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        configured: true,
        type: "supabase_live",
        latency_ms: latency,
        active: true,
      },
      message: "Supabase keep-alive ping successful. Activity timer refreshed.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: err.message,
      },
      { status: 500 }
    );
  }
}
