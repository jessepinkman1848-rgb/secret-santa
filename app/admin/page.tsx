"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    const { data } = await supabase
      .from("participants")
      .select("*")
      .order("name");

    setLinks(data || []);
  }

  async function sendInvitations() {
    const response = await fetch("/api/send-invitation", {
      method: "POST",
    });

    if (response.ok) {
      alert("✅ Invitations envoyées");
    } else {
      alert("❌ Erreur lors de l'envoi");
    }
  }

  async function handleDraw() {
    const { data: participants, error } = await supabase
      .from("participants")
      .select("*");

    if (error) {
      alert(error.message);
      return;
    }

    if (!participants || participants.length < 2) {
      alert("Pas assez de participants");
      return;
    }

    const incomplete = participants.filter(
      (p) => !p.wish1 || !p.wish2 || !p.wish3
    );

    if (incomplete.length > 0) {
      alert(
        `${incomplete.length} participant(s) n'ont pas rempli leurs souhaits`
      );
      return;
    }

    const shuffled = [...participants];
    shuffled.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length; i++) {
      const giver = shuffled[i];
      const receiver = shuffled[(i + 1) % shuffled.length];

      const token = crypto.randomUUID();

      await supabase
        .from("participants")
        .update({
          receiver_id: receiver.id,
          secret_token: token,
        })
        .eq("id", giver.id);
    }

    await loadLinks();

    alert("✅ Tirage enregistré !");
  }

  return (
    <main
      style={{
        padding: 40,
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#b91c1c",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        🎄 Administration Secret Santa
      </h1>

      <button
        onClick={handleDraw}
        style={{
          background: "#15803d",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🎲 Faire le tirage
      </button>

      <button
        onClick={sendInvitations}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          marginLeft: "10px",
        }}
      >
        📧 Envoyer les invitations
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Liens à envoyer</h2>

      {links.map((p) => (
        <div
          key={p.id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#15803d",
            }}
          >
            🎁 {p.name}
          </h3>

          <p>
            {p.wish1 && p.wish2 && p.wish3
              ? "✅ Souhaits remplis"
              : "❌ Souhaits manquants"}
          </p>

          <p>
  <strong>Formulaire souhaits :</strong>
</p>

<a
  href={`https://secret-santa-zeta-three.vercel.app/participant/${p.participant_token}`}
  target="_blank"
  rel="noreferrer"
>
  {`https://secret-santa-zeta-three.vercel.app/participant/${p.participant_token}`}
</a>

<br />
<br />

<p>
  <strong>Résultat :</strong>
</p>

<a
  href={`https://secret-santa-zeta-three.vercel.app/s/${p.secret_token}`}
  target="_blank"
  rel="noreferrer"
>
  {`https://secret-santa-zeta-three.vercel.app/s/${p.secret_token}`}
</a>

{" "}

<button
  onClick={() =>
    navigator.clipboard.writeText(
      `https://secret-santa-zeta-three.vercel.app/participant/${p.participant_token}`
    )
  }
  style={{
    background: "#b91c1c",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  📋 Copier
</button>
        </div>
      ))}
    </main>
  );
}