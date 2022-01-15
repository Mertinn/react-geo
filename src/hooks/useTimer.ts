import { useEffect, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    time,
  };
};

export default useTimer;
