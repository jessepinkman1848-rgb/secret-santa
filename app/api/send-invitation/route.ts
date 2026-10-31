import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  console.log("SEND INVITATION API CALLED");

  const { data: participants, error } = await supabase
    .from("participants")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  for (const p of participants || []) {

  if (p.email !== "ton.email@domaine.com") {
    continue;
  }
    const url =
  `https://secret-santa-zeta-three.vercel.app/participant/${p.participant_token}`;

    const subject =
      p.language === "de"
        ? "Wichteln 2026 🎄"
        : "Secret Santa 2026 🎄";

    const html =
      p.language === "de"
        ? `
          <p>Hallo ${p.name},</p>
          <p>bitte fülle deine Wunschliste aus:</p>
          <p><a href="${url}">${url}</a></p>
          <p>Vielen Dank 🎁</p>
        `
        : `
          <p>Bonjour ${p.name},</p>
          <p>Merci de compléter ta liste de souhaits :</p>
          <p><a href="${url}">${url}</a></p>
          <p>À bientôt 🎁</p>
        `;
const resend = getResend();
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: p.email,
      subject,
      html,
    });
  }

  return NextResponse.json({
    success: true,
  });
}
