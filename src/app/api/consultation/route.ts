import { NextResponse } from "next/server";
import {
  isConsultationSourceId,
  isPhoneOnlyConsultationSource,
} from "@/content/consultation-sources";
import { isLocale } from "@/i18n/types";
import { isConsultationPageId } from "@/lib/consultation-lead-meta";
import { normalizePhoneDigits } from "@/lib/consultation-request";
import { sendConsultationToTelegram } from "@/lib/send-telegram-consultation";

type ConsultationBody = {
  name?: string;
  phone?: string;
  source?: string;
  page?: string;
  locale?: string;
  marketingOptIn?: boolean;
};

export async function POST(request: Request) {
  let body: ConsultationBody;

  try {
    body = (await request.json()) as ConsultationBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const source = body.source ?? "";
  const page = body.page ?? "";
  const locale = body.locale ?? "";
  const marketingOptIn =
    body.marketingOptIn === undefined ? undefined : Boolean(body.marketingOptIn);

  if (!isConsultationSourceId(source)) {
    return NextResponse.json({ error: "invalid_source" }, { status: 400 });
  }

  if (!isConsultationPageId(page)) {
    return NextResponse.json({ error: "invalid_page" }, { status: 400 });
  }

  const phoneOnly = isPhoneOnlyConsultationSource(source);

  if (!phoneOnly && (!name || name.length > 120)) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  if (phoneOnly && name.length > 120) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  const phoneDigits = normalizePhoneDigits(phone);
  if (phoneDigits.length < 11 || phoneDigits.length > 15) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const result = await sendConsultationToTelegram({
    name,
    phone,
    source,
    page,
    locale,
    marketingOptIn,
  });

  if (!result.ok) {
    const status = result.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ error: result.reason }, { status });
  }

  return NextResponse.json({ ok: true });
}
