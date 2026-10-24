"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("participants")
      .insert({
        name,
        email,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Participant ajouté");

    setName("");
    setEmail("");
  }

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🎅 Secret Santa</h1>

      <p>Ajouter un participant</p>

      <form onSubmit={handleSubmit}>
        <p>Nom</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Ajouter participant
        </button>
      </form>
    </main>
  );
}