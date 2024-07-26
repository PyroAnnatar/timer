"use client";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [timer, setTimer] = useState({
    running: false,
    value: 0,
    inputMinutes: 0,
    inputSeconds: 0,
  });
  useEffect(() => {
    if (!timer.running) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.value > 0) {
          return { ...prev, value: prev.value - 1 };
        } else {
          clearInterval(interval);
          return { ...prev, running: false };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.running]);

  useEffect(() => {
    setTimer((prev) => ({
      ...prev,
      value: prev.inputMinutes * 60 + prev.inputSeconds,
    }));
  }, [timer.inputMinutes, timer.inputSeconds]);
  return (
    <div className="grid place-items-center gap-4 border-[1px] border-white p-6 rounded-lg bg-sky-100 shadow-[3.5px_6px_3px_3px_rgb(0,0,0,0.5),3.5px_6px_15px_inset_rgb(255,255,235,0.9)]">
      <div className="text-6xl">
        {" "}
        {String(Math.floor(timer.value / 60) % 60).padStart(2, "0")}:
        {String(Math.floor(timer.value % 60)).padStart(2, "0")}
      </div>
      <form className="flex gap-4">
        <label>
          <input
            value={timer.inputMinutes}
            name="minutes"
            size="5"
            type="number"
            min={0}
            max={60}
            onChange={(e) =>
              setTimer((prev) => ({
                ...prev,
                inputMinutes: Math.max(0, e.target.value || 0),
              }))
            }
            className="bg-[rgb(255,255,200)] rounded-lg px-2 py-1"
          />{" "}
          Minutes
        </label>
        <label>
          <input
            value={timer.inputSeconds}
            name="seconds"
            size="5"
            type="number"
            min={0}
            onChange={(e) =>
              setTimer((prev) => ({
                ...prev,
                inputSeconds: Math.max(0, e.target.value || 0),
              }))
            }
            className="bg-[rgb(255,255,200)] rounded-lg px-2 py-1"
          />{" "}
          Seconds
        </label>
      </form>

      <div className="flex gap-4">
        <button
          className="px-2 py-1  bg-sky-400 hover:bg-sky-400/85 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white"
          onClick={() =>
            setTimer((prev) => ({
              ...prev,
              running: true,
              value: prev.inputMinutes * 60 + prev.inputSeconds,
            }))
          }
        >
          Start
        </button>
        <button
          className="px-2 py-1  bg-sky-400 hover:bg-sky-400/85 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white"
          onClick={() =>
            setTimer((prev) => ({ ...prev, running: !prev.running }))
          }
        >
          Pause/Resume
        </button>
        <button
          className="px-2 py-1  bg-sky-400 hover:bg-sky-400/85 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white"
          onClick={() =>
            setTimer((prev) => ({
              ...prev,
              running: false,
              value: prev.inputMinutes * 60 + prev.inputSeconds,
            }))
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
