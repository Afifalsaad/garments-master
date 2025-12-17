import React from "react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaIndustry,
  FaTruck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Order Placement",
      description:
        "Buyer places garment orders with product details, quantity, delivery date & specifications.",
      icon: <FaClipboardList />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "Production Process",
      description:
        "Factory starts cutting, sewing & finishing based on approved samples and timeline.",
      icon: <FaIndustry />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      title: "Quality Control",
      description:
        "QC team inspects garments to ensure quality, size accuracy & defect-free production.",
      icon: <FaCheckCircle />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      title: "Delivery & Tracking",
      description:
        "Finished garments are packed, shipped and tracked until successful delivery.",
      icon: <FaTruck />,
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            How It Works
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Step-by-step workflow of our Garments Order & Production Tracker
            System
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl p-6 bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl bg-linear-to-r ${step.color} mb-5`}>
                {step.icon}
              </motion.div>

              {/* Step Number */}
              <span className="absolute top-4 right-4 text-6xl font-bold text-base-300 opacity-40">
                {step.id}
              </span>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-base-content/70">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
