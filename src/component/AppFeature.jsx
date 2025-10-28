import React from "react";
import AppFeatureCard from "./AppFeatureCard";
import features from "../assets/data.json";

const AppFeature = () => {
  return (
    <section className="features">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          App Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <AppFeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeature;
