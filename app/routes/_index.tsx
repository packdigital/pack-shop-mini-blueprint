import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

import {
  ShoppingBag,
  ChevronRight,
  Link,
  VolumeX,
  Volume2,
  Gift,
  ChevronsUp,
  Star,
} from "react-feather";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <VideoHero />
      <ProductGrid />
    </div>
  );
}

const VideoHero = () => {
  const [muted, setMuted] = useState(true);
  const [muteVisible, setMuteVisible] = useState(false);
  // Create a ref to attach to the video element
  const videoRef = useRef(null);

  // Function to toggle mute and unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      // @ts-expect-error video ref mute is okay
      // video.muted = !video.muted;
      if (video.muted) {
        video.muted = false;
        setMuted(false);
      } else {
        video.muted = true;
        setMuted(true);
      }

      setMuteVisible(true);
    }
  };

  useEffect(() => {
    if (muteVisible) {
      // Automatically hide the banner after 3 seconds
      const timer = setTimeout(() => {
        setMuteVisible(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [muteVisible]);

  return (
    <section className={`video-hero__x123yu`}>
      <div className="video-hero__container h-screen flex justify-center bg-gradient-to-b from-stone-400 to-stone-200">
        <div className="video-ratio bg-gray-100 relative flex justify-center items-center overflow-hidden">
          {/* Product image ad */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            // src="https://cdn.shopify.com/videos/c/o/v/4a610096ad88451a9361d0ad1d074b9a.mp4"
            src="https://cdn.shopify.com/videos/c/o/v/670609431aaf4962baecd9a332e1b976.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            controls={false}
          />

          {/* Product Shop Card bg-gray-700 bg-opacity-20*/}
          <div className="video-hero__story-info-container absolute w-full p-4 h-full shadow-[inset_0_-120px_200px_30px_rgba(92,92,92,0.65)] flex flex-col justify-between">
            <div className="story-info-header gap-3 flex items-center">
              <div className="story-info-header__promobar rounded-full px-4 py-1 flex-grow bg-orange-100 flex justify-center items-center gap-2 overflow-hidden">
                {/* <Gift strokeWidth={1.5} className="w-5 shrink-0" /> */}
                <div className="truncate">
                  👋🏻 Welcome, extra 20% off! Applied at checkout
                </div>
              </div>

              <button className="story-info-header__action p-1 shrink-0">
                <ShoppingBag className="text-white" strokeWidth={1.5} />
              </button>
            </div>

            <div className="story-info-footer w-full space-y-2">
              {/* Overflow hidden for the truncate text below */}
              {/* Profile Image  */}
              <div className="flex items-center gap-2 mb-1">
                <img
                  className="block aspect-square rounded-full overflow-hidden max-h-7 border border-gray-950"
                  src="https://cdn.shopify.com/s/files/1/0671/5074/1778/files/logo-pack.png?v=1697648430"
                  alt="Models wearing sweaters"
                />
                <p className="text-white font-normal">@packdigital</p>
              </div>

              {/* Story Info Card */}
              <div className="flex items-start w-full gap-2">
                <div className="flex-grow overflow-hidden space-y-2">
                  {/* Picture & Product Title/Details */}
                  <div className="bg-gray-700 bg-opacity-70 rounded-md p-3 space-y-3">
                    <div className="product-info__img-details flex gap-3 items-center text-white">
                      <img
                        className="block aspect-square rounded-md overflow-hidden max-h-20 shrink-0"
                        src="https://cdn.shopify.com/s/files/1/0671/5074/1778/files/pack-lander-faux-product.png?v=1717553275"
                        alt="Models wearing sweaters"
                      />

                      <div className="overflow-hidden">
                        <h1 className="text-lg font-normal flex items-center gap-2">
                          <div className="px-2 rounded-full bg-orange-100 text-black w-fit text-sm">
                            -50%
                          </div>

                          <span className="truncate">
                            Cashmere Crew Pullover
                          </span>
                        </h1>

                        <div className="flex gap-1">
                          <Star className="w-4 fill-white" strokeWidth={1.5} />
                          <Star className="w-4 fill-white" strokeWidth={1.5} />
                          <Star className="w-4 fill-white" strokeWidth={1.5} />
                          <Star className="w-4 fill-white" strokeWidth={1.5} />
                          <Star className="w-4" strokeWidth={1.5} />
                          245 reviews
                        </div>

                        <div className="space-x-2">
                          <span className="text-2xl">$60</span>
                          <span className="line-through">$120</span>
                          <span>USD</span>
                        </div>
                      </div>
                    </div>

                    {/* ATC Button */}
                    <button className="px-3 py-2 rounded-md bg-orange-100 flex items-center gap-3 justify-between font-normal w-full">
                      Add to cart <ChevronRight strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Story description */}
                  <div>
                    <p className="truncate w-full text-white">
                      The #1 selling sweater in California
                    </p>

                    {/* Sub description */}
                    <p className="truncate w-full text-white text-sm font-thin">
                      More than <b>4,200</b> customers have bought this product
                    </p>
                  </div>
                </div>

                {/* Post Details Action Items */}
                <div className="flex flex-col gap-4 shrink-0 p-1 w-12">
                  <button
                    className="text-center text-white space-y-1"
                    onClick={toggleMute}
                  >
                    {muted ? (
                      <>
                        <VolumeX strokeWidth={1.5} className="mx-auto" />
                        <span className="text-xs">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 strokeWidth={1.5} className="mx-auto" />
                        <span className="text-xs">Mute</span>
                      </>
                    )}
                  </button>

                  <button className="text-center text-white space-y-1">
                    <Link strokeWidth={1.5} className="mx-auto" />
                    <span className="text-xs">Copy</span>
                  </button>
                </div>
              </div>

              {/* Story info action badge */}
              <div className="mx-auto bg-gray-700 border border-gray-600 bg-opacity-70 w-fit rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs">
                <ChevronsUp className="w-4" strokeWidth={1.5} />
                Scroll for more
              </div>
            </div>
          </div>

          {muteVisible && (
            <div className="fade-in text-white absolute bg-gray-700 bg-opacity-70 rounded-full w-14 h-14 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
              {muted ? (
                <VolumeX strokeWidth={1.5} />
              ) : (
                <Volume2 strokeWidth={1.5} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProductGridTile = () => {
  return (
    <div className="product-grid-tile relative">
      <div className="product-grid-tile__badges absolute top-2 left-2">
        <div className="px-2 rounded-full bg-orange-100 text-black w-fit text-sm">
          -50% OFF
        </div>
      </div>
      <div className="aspect-square overflow-hidden">
        <img
          className="block object-cover rounded-md overflow-hidden w-full"
          src="https://cdn.shopify.com/s/files/1/0671/5074/1778/files/pack-lander-faux-product.png?v=1717553275"
          alt="Models wearing sweaters"
        />
      </div>

      <div className="overflow-hidden pt-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="space-x-2">
            <span className="text-lg font-normal">$60</span>
            <span className="line-through">$120</span>
            <span>USD</span>
          </div>

          <div className="flex gap-1">
            <Star className="w-3 fill-black" strokeWidth={1.5} />
            <Star className="w-3 fill-black" strokeWidth={1.5} />
            <Star className="w-3 fill-black" strokeWidth={1.5} />
            <Star className="w-3 fill-black" strokeWidth={1.5} />
            <Star className="w-3" strokeWidth={1.5} />
            245 reviews
          </div>
        </div>

        <h1 className="text-xl font-normal flex items-center gap-2">
          <span className="truncate">Cashmere Crew Pullover</span>
        </h1>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <section className={`product-grid__x123yu bg-stone-200`}>
      <div className="max-w-5xl mx-auto p-4 pt-8">
        <h2 className="text-2xl font-semibold pb-4 border-b border-b-gray-950">
          Top selling sweaters
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
          <ProductGridTile />
          <ProductGridTile />
          <ProductGridTile />
          <ProductGridTile />
          <ProductGridTile />
          <ProductGridTile />
        </div>
      </div>
    </section>
  );
};
