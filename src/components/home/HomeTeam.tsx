import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  website?: string;
}

interface TeamSectionProps {
  data?: {
    title?: string;
    description?: string;
    members?: TeamMember[];
  };
}

const HomeTeam: React.FC<TeamSectionProps> = ({ data }) => {
  if (!data) return null;

  const {
    title = "Meet Our Team",
    description = "We bring together innovation, design, and purpose to create solutions that empower people and the planet.",
    members = [],
  } = data;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          {title}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-14 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 w-full max-w-sm shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              {member.image ? (
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-green-100 shadow-inner">
                  <img
                    src={member.image}
                    alt={member.name || "Team Member"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-semibold">
                  {member.name ? member.name[0] : "?"}
                </div>
              )}

              {/* Name & Role */}
              <h3 className="text-xl font-semibold text-green-700 mb-1">
                {member.name || "Unnamed Member"}
              </h3>
              <p className="text-gray-600 text-sm italic mb-4">
                {member.role || "Role not specified"}
              </p>

              {/* Social Links */}
              {(member.linkedin || member.website) && (
                <div className="flex justify-center gap-4 mt-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-green-700 transition-transform transform hover:scale-110"
                      title="LinkedIn Profile"
                    >
                      <FaLinkedin size={22} />
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-green-700 transition-transform transform hover:scale-110"
                      title="Website"
                    >
                      <FaGlobe size={22} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTeam;
