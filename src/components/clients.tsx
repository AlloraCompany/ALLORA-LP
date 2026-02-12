"use client";

import getClients from "@/sanity/get-clients";
import { SanityDocument } from "next-sanity";
// import LogoSlider from "./logo-slider";
import { useEffect, useState } from "react";
import LogoSlider from "./logo-slider";

interface ClientType {
  logo_url: string;
  nome: string;
  // link: string;
}

export default function ClientsGallery() {
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    getClients().then((data) =>
      // (data) => console.log(data)
      setClients(
        data.map((c: SanityDocument) => ({
          nome: c.nome,
          logo_url: c.logo_url,
        }))
      )
    );
    console.log(clients);
  }, []);

  return (
    <div className="/px-[2.5vw] /xl:px-[1.5vw]">
      <h1 className="text-white font-black text-[3.2vw] uppercase">
        {/* fazem parte do club */}
      </h1>
      <LogoSlider clients={clients} />
    </div>
  );
}
