import { stepsData } from "../assets/assets";
import { motion as Motion } from "framer-motion";

const Steps = () => {
  return (
    <Motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-50 "
    >
      <Motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, delay: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5x1 font-semibold mb-2 "
      >
        How it works
      </Motion.h1>
      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, delay: 0.4 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-lg text-gray-600 mb-8"
      >
        Transform Words Into Stunning Images
      </Motion.p>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, delay: 0.6 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4 w-full max-w-3x1 text-sm"
      >
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 py-5 bg-white shadow-md border-0 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <img src={item.icon} width={40} alt="" />
            <div className="">
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-grey-500">{item.description}</p>
            </div>
          </div>
        ))}
      </Motion.div>
    </Motion.div>
  );
};

export default Steps;
