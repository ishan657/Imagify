import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion as Motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/Result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <Motion.div
      className="flex flex-col items-center justify-center text-center my-20"
      initial={{ opacity: 0, y: 100 }} // Initial state for animation
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }} // Animation when in view
      viewport={{ once: true }} // Animation only once when it comes into view
    >
      <Motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>Best Text to Image Generator</p>
        <img src={assets.star_icon} alt="" />
      </Motion.div>
      <Motion.h1
        className=" max-w-[300px] sm:text-7x1 sm:max-w-[590px] mx-auto mt-10 text-center text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
      >
        Turn text to <span className="text-blue-600">Image</span>, in seconds.
      </Motion.h1>
      <Motion.p
        className="text-center max-w-xl max-auto mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Unleash your creativity with AI. Turn your imagination into stunning
        images in seconds - just type and see the magic happen!
      </Motion.p>
      <Motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Image
        <img className="h-6" src={assets.star_group} alt="" />
      </Motion.button>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex flex-wrap justify-center mt-16 gap-3"
      >
        {Array(6)
          .fill()
          .map((item, index) => (
            <Motion.img
              whileHover={{ scale: 1.05, duration: 0.1 }}
              key={index}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              width={70}
            />
          ))}
      </Motion.div>
      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-2 text-neutral-600"
      >
        Generate images from imagify
      </Motion.p>
    </Motion.div>
  );
};

export default Header;
