import React from "react";
import backgrd from "../bgg.jpg";
import { useEffect, useState } from "react";
import sanityClients from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";

const About = () => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClients
      .fetch(
        `*[_type == "author"]{
      name,
      bio,
      "authorImage": image.asset->url
    }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  console.log(author);
  if (!author) return <div>Loading....</div>;

  return (
  <main className="relative">
    <img src={backgrd} alt="background-imag" className="absolute w-full" />
    <div className="p-10 lg:pt-48 container mx-auto relative">
      <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
        <img src={author.authorImage} alt={author.name} className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8" />
        <div className="text-lg flex flex-col justify-center">
          <h1 className="text-6xl text-green-300 mb-4">
            Hey there, i'm {" "}

            <span className="text-green-100">{author.name}</span>
          </h1>
          <div className="prose lg:prose-xl text-white">
            <SanityBlockContent  blocks={author.bio} projectId='iio3w8o6' dataset="production "/>
          </div>
        </div>
      </section>
    </div>
  </main>);
};

export default About;
