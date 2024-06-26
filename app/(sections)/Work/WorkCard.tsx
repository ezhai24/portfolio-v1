import { BsArrowUpRight } from "@react-icons/all-files/bs/BsArrowUpRight";
import { BsLink45Deg } from "@react-icons/all-files/bs/BsLink45Deg";
import { motion } from "framer-motion";
import Link from "next/link";

import { Tag } from "@/components/Tag";

export type WorkType = {
  dates: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
  companyLink: string;
  projectLinks?: { label: string; href: string }[];
};

interface Props extends WorkType {
  alignment?: "UP" | "DOWN";
  className?: string;
}
export const WorkCard = (props: Props) => {
  const {
    company,
    role,
    description,
    dates,
    tags,
    companyLink,
    projectLinks,
    alignment,
    className,
  } = props;
  return (
    <div
      className={`${className} ${
        alignment === "DOWN" ? "mt-16" : ""
      } relative mr-14 hover:cursor-pointer`}
    >
      <Link href={companyLink} target="_blank">
        <motion.div
          whileHover="hover"
          variants={{ hover: { y: 2, x: 2 } }}
          className="relative flex h-100 w-80 flex-col justify-center rounded-lg bg-blue p-10 text-center"
        >
          <motion.span
            variants={{ hover: { y: -5, x: 5 } }}
            className="absolute right-6 top-6"
          >
            <BsArrowUpRight />
          </motion.span>
          <p className="mb-5">{dates}</p>
          <h2>{company}</h2>
          <h3>{role}</h3>
          <p className="mt-2">{description}</p>
          <ul className="mb-3 mt-5 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {projectLinks?.map(({ label, href }) => (
              <li
                key={label}
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.open(href, "_blank");
                  }
                }}
                className="flex items-center gap-0.5 text-sm hover:underline"
              >
                <BsLink45Deg />
                {label}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-1">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </ul>
        </motion.div>
      </Link>

      <div className="absolute left-4 top-4 -z-10 h-100 w-80 rounded-lg bg-black p-10" />
    </div>
  );
};
