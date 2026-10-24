"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ParticipantPage() {
  const params = useParams();
  const token = params.token as string;

  const [participant, setParticipant] = useState<any>(null);
  const [wish1, setWish1] = useState("");
  const [wish2, setWish2] = useState("");
  const [wish3, setWish3] = useState("");

  useEffect(() => {
    async function loadParticipant() {
      const { data } = await supabase
        .from("participants")
        .select("*")
        .eq("participant_token", token)
        .single();

      if (data) {
        setParticipant(data);
        setWish1(data.wish1 || "");
        setWish2(data.wish2 || "");
        setWish3(data.wish3 || "");
      }
    }

    if (token) {
      loadParticipant();
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("participants")
      .update({
        wish1,
        wish2,
        wish3,
      })
      .eq("participant_token", token);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Souhaits enregistrés");
  }

  if (!participant) {
    return <main style={{ padding: 40 }}>Chargement...</main>;
  }

const isGerman = participant.language === "de";

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
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    fontSize: "4rem",
    marginBottom: "10px",
  }}
>
  <span>🎅</span>
  <span>🦌</span>
</div>
     <h1
  style={{
    color: "#b91c1c",
    textAlign: "center",
    fontSize: "4rem",
    marginBottom: "10px",
    fontWeight: "bold",
  }}
>
  {isGerman
  ? "🎄 Wichteln 2026 🎄"
  : "🎄 Secret Santa 2026 🎄"}
</h1>
<div
  style={{
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  }}
>
  🎅 🎁 🦌 ❄️ 🎄
</div>

      <h2
  style={{
    color: "#15803d",
  }}
>
  {isGerman
    ? `Hallo ${participant.name} 👋`
    : `Bonjour ${participant.name} 👋`}
</h2>
<p
  style={{
    color: "#555",
    marginBottom: "30px",
  }}
>
  {isGerman
  ? "Bitte fülle deine Wunschliste für den Secret Santa aus 🎁"
  : "Merci de compléter ta liste de souhaits pour le Secret Santa 🎁"}
</p>

      <form onSubmit={handleSubmit}>
        <p>{isGerman ? "Wunsch 1" : "Souhait 1"}</p>
        <input
  value={wish1}
  onChange={(e) => setWish1(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  }}
/>

        <p>{isGerman ? "Wunsch 2" : "Souhait 2"}</p>
        <input
  value={wish2}
  onChange={(e) => setWish2(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  }}
/>

        <p>{isGerman ? "Wunsch 3" : "Souhait 3"}</p>
        <input
  value={wish3}
  onChange={(e) => setWish3(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  }}
/>

        <br />
        <br />

        <button
  type="submit"
  style={{
    background: "#15803d",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  }}
>
  {isGerman
  ? "🎁 Wünsche speichern"
  : "🎁 Enregistrer mes souhaits"}
</button>
<p
  style={{
    textAlign: "center",
    color: "#666",
    marginTop: "20px",
    fontSize: "0.9rem",
  }}
>
  {isGerman
    ? "Die Auslosung wird durchgeführt, sobald alle Teilnehmer ihre Wunschliste ausgefüllt haben 🎄"
    : "Le tirage sera effectué lorsque tous les participants auront complété leur liste de souhaits 🎄"}
</p>
      </form>    
      </div>
``
    <div
  style={{
    textAlign: "center",
    marginTop: "30px",
    fontSize: "2rem",
  }}
>
  🎄 ❄️ 🎁 ❄️ 🎄
</div>
</main>
  );
}