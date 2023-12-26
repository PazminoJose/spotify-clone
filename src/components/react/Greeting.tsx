import { useCallback, useEffect, useState } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState("");

  const calculateGreeting = useCallback(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting = "";

    if (currentHour < 12) {
      greeting = "Buenos días";
    } else if (currentHour < 18) {
      greeting = "Buenas tardes";
    } else {
      greeting = "Buenas noches";
    }

    setGreeting(greeting);
  }, []);

  useEffect(() => {
    calculateGreeting();
  }, []);

  return <h1 className="text-3xl font-bold">{greeting}</h1>;
}
