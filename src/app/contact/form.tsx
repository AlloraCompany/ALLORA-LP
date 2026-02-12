"use client";

import { FormEvent, useState } from "react";
import { clover_grotesk } from "../fonts";

const successMessage = "mensagem enviada! entraremos em contato em breve.";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      await response.json();
      // TODO: limpar form e avisar que foi enviado

      setStatus(successMessage);
      form.reset();
      // console.log(responseData["message"]);

      // alert("Message successfully sent");
    } catch (err) {
      console.error(err);
      // alert("Error, please try resubmitting the form");
    }
  };
  return (
    <form
      style={{
        fontSize: "max(18px, 2vw)",
      }}
      className="px-[2.5vw] xl:px-[1.5vw] flex-1 min-w-[270px]"
      onSubmit={handleSubmit}
    >
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-5 sm:gap-10">
        <div className="w-full relative">
          <label aria-hidden className="sr-only" htmlFor="name">
            nome
          </label>
          <input
            type="text"
            minLength={3}
            maxLength={150}
            required
            className="text-white  p-2 bg-black !border-b border-white border-opacity-50 size-full h-fit placeholder:opacity-50 placeholder:font-medium placeholder:text-white"
            autoComplete="off"
            placeholder="nome*"
            id="name"
            name="name"
          />
        </div>
        <div className="w-full relative">
          <label aria-hidden className="sr-only" htmlFor="company">
            empresa
          </label>
          <input
            type="text"
            minLength={2}
            maxLength={150}
            className="text-white  p-2 bg-black !border-b border-white border-opacity-50 size-full h-fit placeholder:opacity-50 placeholder:font-medium placeholder:text-white"
            autoComplete="off"
            placeholder="empresa"
            id="company"
            name="company"
          />
        </div>
        <div className="w-full relative">
          <label aria-hidden className="sr-only" htmlFor="email">
            email
          </label>
          <input
            type="email"
            minLength={3}
            maxLength={150}
            required
            className="text-white  p-2 bg-black !border-b border-white border-opacity-50 size-full h-fit placeholder:opacity-50 placeholder:font-medium placeholder:text-white"
            autoComplete="off"
            placeholder="email*"
            id="email"
            name="email"
          />
        </div>
        <div className="w-full relative">
          <label aria-hidden className="sr-only" htmlFor="phone">
            telefone
          </label>
          <input
            type="text"
            minLength={3}
            maxLength={150}
            className="text-white  p-2 bg-black !border-b border-white border-opacity-50 size-full h-fit placeholder:opacity-50 placeholder:font-medium placeholder:text-white"
            autoComplete="off"
            placeholder="telefone"
            id="phone"
            name="phone"
          />
        </div>
      </div>
      <div className="w-full relative mt-5 sm:mt-10">
        <label aria-hidden className="sr-only" htmlFor="message">
          message
        </label>
        <textarea
          minLength={3}
          maxLength={2000}
          required
          className="text-white resize-none  p-2 bg-black !border-b border-white border-opacity-50 size-full h-[20vh] placeholder:opacity-50 placeholder:font-medium placeholder:text-white"
          autoComplete="off"
          placeholder="conta sua visão, vamos transformá-la em resultado!"
          id="message"
          name="message"
        />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-y-5">
        <button type="submit" className="w-[25%]">
          <svg
            viewBox="0 0 110 25"
            // preserveAspectRatio="xMidYMid meet"
            className={`w-full group  cursor-pointer cursor-expand-hover  bg-underline bg-size-auto-190 pb-2  bg-y-0 hover:bg-y-100 hover:text-background transition-all`}
          >
            <text
              x="0"
              y="23"
              textLength={110}
              // fill="#f60"
              className={`leading-none w-full cursor-pointer cursor-expand-hover text-3xl font-bold text-white fill-white group-hover:fill-background transition-all ${clover_grotesk.className}`}
            >
              enviar
            </text>
          </svg>
        </button>
        <span
          className={`text-allorange w-fit lg:w-[70%] text-wrap text-sm xl:text-lg text-right mr-0 m-auto ${clover_grotesk.className}`}
        >
          {status}
        </span>
      </div>
    </form>
  );
}
