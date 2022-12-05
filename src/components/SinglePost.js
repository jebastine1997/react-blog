import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SanityBlockContent from "@sanity/block-content-to-react";
import sanityClients from "../client";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClients
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url,
        }
      },
      body,
      "name": author->name,
      "authorImage" : author->image
    }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading......</div>;

  return (
    <main className="bg-gray-200 min-h-screen p-12">
      <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
        <header className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h1 className="text-3xl lg:text-6xl mb-4">{singlePost.title}</h1>
              <div className="flex justify-center text-gray-800">
                <img
                  src={singlePost.mainImage.asset.url}
                  alt={singlePost.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <p className="flex items-center pl-2 text-2xl">
                {singlePost.name}
              </p>
            </div>
          </div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
            className="w-full object-cover rouned-t"
            style={{ height: "400px" }}
          />
        </header>
        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
          <SanityBlockContent blocks={singlePost.body} projectId="iio3w8o6" dataset="production"/>
        </div>
      </article>
    </main>
  );
};

export default SinglePost;
