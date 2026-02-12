import { motion } from "motion/react";
import Image from "next/image";

interface ClientType {
  logo_url: string;
  nome: string;
  // link: string;
}

export default function LogoSlider({ clients }: { clients: ClientType[] }) {
  return (
    <div className="max-w-full overflow-hidden">
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-fit flex gap-2 flex-shrink-0 min-w-[70vw] justify-between"
        >
          {clients &&
            clients.map((c, _i) => (
              <div
                className="h-[9vh] min-h-8 max-h-28 aspect-video relative"
                key={_i}
              >
                <Image src={c.logo_url} alt={c.nome} fill objectFit="contain" />
              </div>
            ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-fit flex gap-2 flex-shrink-0 min-w-[70vw] justify-between"
        >
          {clients &&
            clients.map((c, _i) => (
              <div
                className="h-[9vh] min-h-8 max-h-28 aspect-video relative"
                key={_i}
              >
                <Image src={c.logo_url} alt={c.nome} fill objectFit="contain" />
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
