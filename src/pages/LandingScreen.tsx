import React from "react";
import { Link } from "react-router";

const LandingScreen: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-6xl text-bold text-center animate-pulse">Howdy!</h1>
      <h1 className="text-xl text-bold text-center animate-bounce">
        Watching <b>(Photo Transfer with QR)</b> Demo
      </h1>
      <div className="flex justify-center">
        <Link
          to="/login"
          className="animate-bounce text-white bg-danger px-8 p-2 hover:bg-danger/40 focus:ring-4 focus:outline-none focus:ring-danger/90 font-medium rounded-lg text-center dark:bg-danger dark:hover:bg-danger/60 dark:focus:ring-danger/20"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingScreen;
