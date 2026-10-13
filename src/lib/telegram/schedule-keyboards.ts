import type { LeadStatusKey } from "@/lib/telegram-lead-message";
import { leadInlineKeyboard } from "@/lib/telegram-lead-message";
import {
  CALLBACK_PRESETS,
  SCHEDULE_CALLBACK,
  VISIT_PRESETS,
} from "@/lib/telegram/schedule-presets";

type InlineButton =
  | { text: string; callback_data: string }
  | { text: string; url: string };

type InlineKeyboard = Readonly<{
  inline_keyboard: ReadonlyArray<ReadonlyArray<InlineButton>>;
}>;

function row(button: InlineButton): InlineButton[] {
  return [button];
}

export function leadMainKeyboard(
  phone: string,
  status: LeadStatusKey,
): InlineKeyboard {
  const base = leadInlineKeyboard(phone, status);
  const rows = [...base.inline_keyboard] as InlineButton[][];

  if (status === "accepted" || status === "callback" || status === "new") {
    if (status !== "new") {
      rows.push(
        row({
          text: "📅  Когда приедет клиент",
          callback_data: SCHEDULE_CALLBACK.visitMenu,
        }),
      );
    }
    if (status === "callback" || status === "accepted") {
      rows.push(
        row({
          text: "📞  Когда перезвонить",
          callback_data: SCHEDULE_CALLBACK.callbackMenu,
        }),
      );
    }
  }

  return { inline_keyboard: rows };
}

export function visitPickerKeyboard(): InlineKeyboard {
  const rows: InlineButton[][] = VISIT_PRESETS.map((preset) =>
    row({
      text: `🕐  ${preset.label}`,
      callback_data: SCHEDULE_CALLBACK.visitPreset(preset.id),
    }),
  );
  rows.push(
    row({
      text: "✏️  Своя дата и время",
      callback_data: SCHEDULE_CALLBACK.visitManual,
    }),
  );
  rows.push(
    row({ text: "←  Назад к заявке", callback_data: SCHEDULE_CALLBACK.back }),
  );
  return { inline_keyboard: rows };
}

export function callbackPickerKeyboard(): InlineKeyboard {
  const rows: InlineButton[][] = CALLBACK_PRESETS.map((preset) =>
    row({
      text: `🕐  ${preset.label}`,
      callback_data: SCHEDULE_CALLBACK.callbackPreset(preset.id),
    }),
  );
  rows.push(
    row({
      text: "✏️  Своя дата и время",
      callback_data: SCHEDULE_CALLBACK.callbackManual,
    }),
  );
  rows.push(
    row({ text: "←  Назад к заявке", callback_data: SCHEDULE_CALLBACK.back }),
  );
  return { inline_keyboard: rows };
}
