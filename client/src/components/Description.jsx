import React from "react";
import { assets } from "../assets/assets";
import { motion as Motion } from "framer-motion";

const Description = () => {
  return (
    <Motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-4xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn Your imagination into visuals</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <Motion.h2
            initial={{ opacity: 0.2, y: 20 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-medium max-w-lg mb-4"
          >
            Introducing the AI-powered Text to Image Generator
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0.2, y: 20 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-4"
          >
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </Motion.p>
          <Motion.p
            initial={{ opacity: 0.2, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 "
          >
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don't yet exist can be
            visualized effortlessly. Powered by advanced AI technology,
            theSubscr creative possibilities are limitless!
          </Motion.p>
        </div>
      </div>
    </Motion.div>
  );
};

export default Description;
