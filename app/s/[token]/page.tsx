import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SecretPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const { data: giver } = await supabase
    .from("participants")
    .select("*")
    .eq("secret_token", token)
    .single();

  if (!giver) {
    return <h1>Lien invalide</h1>;
  }

  const { data: receiver } = await supabase
    .from("participants")
    .select("*")
    .eq("id", giver.receiver_id)
    .single();

  if (!receiver) {
    return <h1>Destinataire introuvable</h1>;
  }

const isGerman = giver.language === "de";

 return (
  <main
    style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h1
  style={{
    textAlign: "center",
    color: "#b91c1c",
  }}
>
  🎄 Secret Santa 2026 🎄
  <div
  style={{
    textAlign: "center",
    fontSize: "3rem",
    marginBottom: "20px",
  }}
>
  🎅 🎁 🦌 ❄️ 🎄
</div>
</h1>

      <h2 style={{ color: "#15803d" }}>
  {isGerman
    ? "Du schenkst ein Geschenk an:"
    : "Tu offres un cadeau à :"}
</h2>

      <p
  style={{
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#b91c1c",
    textAlign: "center",
    margin: "30px 0",
  }}
>
  🎁 {receiver.name} 🎁
</p>

      <h2>
  {isGerman ? "Wunschliste" : "Ses souhaits"}
</h2>

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  }}
>
  <div
    style={{
      background: "#f3f4f6",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    🎁 {receiver.wish1}
  </div>

  <div
    style={{
      background: "#f3f4f6",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    🎁 {receiver.wish2}
  </div>

  <div
    style={{
      background: "#f3f4f6",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    🎁 {receiver.wish3}
  </div>
</div>
<p
  style={{
    marginTop: "30px",
    textAlign: "center",
    color: "#666",
  }}
>
  {isGerman
    ? "Viel Spaß beim Wichteln und frohe Weihnachten 🎄"
    : "Amuse-toi bien avec le Secret Santa et joyeuses fêtes 🎄"}
</p>

    </div>
  </main>
);
}