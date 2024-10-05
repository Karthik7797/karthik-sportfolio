import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle window resize events
  const handleResize = () => {
    // Set isMobile based on the window width
    setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as necessary
  };

  // Set up the resize event listener
  useEffect(() => {
    handleResize(); // Check the initial size
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Dynamically load Spline viewer script if it's a mobile device
  useEffect(() => {
    if (isMobile) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup script when component unmounts
      };
    }
  }, [isMobile]);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-start gap-5`}>
        <div className="flex gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className="text-[#915eff]">Karthik</span>
          </h1>
          <p className="font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-[#915eff59]">
            I develop User interfaces and Web Applications.
          </p>
        </div>
        </div>
        {isMobile ? (
        <spline-viewer
          loading-anim-type="spinner-small-light"
          url="https://prod.spline.design/CdkoWl40mHLdigtu/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        ></spline-viewer>
      ) : (
        <div className="hidden"></div>
      )}
      </div>

       {/* Conditionally render either Spline viewer or ComputersCanvas */}
       {isMobile ? (
        <div className="hidden"></div>
      ) : (
        <ComputersCanvas />
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
