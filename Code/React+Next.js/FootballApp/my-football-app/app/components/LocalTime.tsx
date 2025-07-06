"use client";

// Imports
import { Fixture } from "@/types";
import { useEffect, useState } from "react";
import moment from "moment";

// Tipo dos parâmetros
type PageProps = {
  fixture: Fixture;
};

// Função que formata o horário para o fuso horário local
export default function LocalTime({ fixture }: PageProps) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    function formatToLocalTime(timeUTC: string): string {
      const newTime = moment(timeUTC);
      const localDateString = newTime.format("dddd, LL");
      const localTimeString = newTime.format("HH:mm");
      return `${localDateString} ${localTimeString}`;
    }

    const fixtureTime = fixture.fixture.date;
    const formatted = formatToLocalTime(fixtureTime);
    setFormattedTime(formatted);
  }, []);

  return (
    <div className="flex justify-center items-center text-center">
      {formattedTime}
    </div>
  );
}
