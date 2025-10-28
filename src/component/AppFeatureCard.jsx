import React from "react";

const AppFeatureCard = ({ feature }) => {
  return (
    <article
      className="feature-card bg-white rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200 ease-out hover:-translate-y-1 p-6 flex items-start gap-4"
      tabIndex={0}
      aria-labelledby={`feature-title-${feature.id}`}
    >
      <div className="w-12 h-12 shrink-0 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
        {feature.icon ? (
          <img
            src={feature.icon}
            alt={`${feature.title} icon`}
            className="w-8 h-8"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4"
            />
          </svg>
        )}
      </div>

      <div className="flex-1">
        <h3
          id={`feature-title-${feature.id}`}
          className="text-lg font-semibold text-gray-800"
        >
          {feature.title}
        </h3>
        <p className="mt-2 text-gray-600 text-sm">{feature.desc}</p>
      </div>
    </article>
  );
};

export default AppFeatureCard;

/* Focus style (kept inline via class in tailwind; if you prefer a CSS file, move this there) */
