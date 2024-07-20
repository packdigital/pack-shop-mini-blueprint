import {useEffect, useRef, useState} from 'react';
import {Link as CopyLink, VolumeX, Volume2, ChevronsUp} from 'react-feather';

import {Image, Markdown} from '~/components';

import {ShoppableSocialVideoProductCard} from './ShoppableSocialVideoProductCard';
import {Schema} from './ShoppableSocialVideo.schema';
import type {ShoppableSocialVideoCms} from './ShoppableSocialVideo.types';

export function ShoppableSocialVideo({cms}: {cms: ShoppableSocialVideoCms}) {
  const ref = useRef(null);
  const videoRef = useRef(null);

  const {video, background, additional} = cms;
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(true);
  const [muteVisible, setMuteVisible] = useState(false);

  // Function to toggle mute and unmute
  const toggleMute = () => {
    const video = videoRef.current as HTMLVideoElement | null;
    if (video) {
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

  const {
    colorType = 'to bottom',
    firstColor = '#94A3B8',
    secondColor = '#E2E8F0',
  } = {...background};
  const {
    enabledProfile = true,
    profileName,
    profileImage,
    subtext,
    color = '#FFFFFF',
  } = {...additional};

  return (
    <div
      className="video-hero__container relative flex h-screen justify-center overflow-hidden bg-gray-300 after:pointer-events-none after:absolute after:left-1/2 after:top-0 after:z-[-1] after:h-[calc(100%+100px)] after:w-[calc(100%+400px)] after:-translate-x-1/2 after:bg-transparent after:shadow-[inset_0_50px_100px_50px_rgba(0,0,0,0.4)]"
      style={{
        ...(colorType === 'solid'
          ? {backgroundColor: firstColor}
          : {
              backgroundImage: `linear-gradient(${colorType}, ${firstColor}, ${secondColor})`,
            }),
      }}
      ref={ref}
    >
      <div className="video-ratio relative flex items-center justify-center overflow-hidden">
        {/* Product image ad */}
        <video
          ref={videoRef}
          src={video?.src}
          className="size-full object-cover"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          poster={video?.poster?.src}
        />

        {/* Product Shop Card bg-gray-700 bg-opacity-20*/}
        <div className="absolute flex size-full flex-col justify-between p-4 shadow-[inset_0_-120px_200px_30px_rgba(92,92,92,0.65)]">
          <div className="flex items-center gap-3"></div>

          <div className="w-full space-y-2">
            {/* Profile */}
            {enabledProfile && (
              <div className="mb-1 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center overflow-hidden rounded-[50%] border border-text bg-background">
                  <Image
                    data={{
                      altText: profileImage?.altText || 'Profile image',
                      url: profileImage?.src,
                      width: profileImage?.width,
                      height: profileImage?.height,
                    }}
                    aspectRatio={
                      profileImage?.width && profileImage?.height
                        ? `${profileImage.width}/${profileImage.height}`
                        : '1/1'
                    }
                    className="bg-transparent"
                    withLoadingAnimation={false}
                    sizes="60px"
                    width="15px"
                  />
                </div>
                <p className="font-normal" style={{color}}>
                  {profileName}
                </p>
              </div>
            )}

            {/* Story Info Card */}
            <div className="flex w-full items-start gap-2">
              <div className="grow space-y-2 overflow-hidden">
                <ShoppableSocialVideoProductCard cms={cms} />

                {/* Story description */}
                <div style={{color}}>
                  <Markdown>{subtext}</Markdown>
                </div>
              </div>

              {/* Post Details Action Items */}
              <div className="flex w-12 shrink-0 flex-col gap-4 p-1">
                <button
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  className="space-y-1 text-center"
                  onClick={toggleMute}
                  style={{color}}
                  type="button"
                >
                  {muted ? (
                    <>
                      <VolumeX
                        strokeWidth={2}
                        className="mx-auto"
                        color={color}
                      />
                      <span className="text-xs">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2
                        strokeWidth={2}
                        className="mx-auto"
                        color={color}
                      />
                      <span className="text-xs">Mute</span>
                    </>
                  )}
                </button>

                <button
                  aria-label="Copy link to clipboard"
                  className="space-y-1 text-center"
                  style={{color}}
                  onClick={() => {
                    setCopied(true);
                    window.navigator.clipboard.writeText(window.location.href);
                    setTimeout(() => {
                      setCopied(false);
                    }, 1000);
                  }}
                  type="button"
                >
                  <CopyLink strokeWidth={2} className="mx-auto" color={color} />
                  <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Story info action badge */}
            <button
              aria-label="Scroll for more"
              className="mx-auto flex w-fit items-center gap-1 rounded-full border border-gray-600 bg-gray-700 bg-opacity-[0.7] px-3 py-1 text-xs text-white"
              onClick={() => {
                if (!ref.current) return;
                const container = ref.current as HTMLElement;
                const bottomY = container.getBoundingClientRect()?.bottom;
                window.scrollTo({
                  top: bottomY,
                  behavior: 'smooth',
                });
              }}
              type="button"
            >
              <ChevronsUp className="w-4" strokeWidth={1.5} />
              Scroll for more
            </button>
          </div>
        </div>

        {muteVisible && (
          <div className="fade-in absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-700 bg-opacity-[0.7] text-white">
            {muted ? (
              <VolumeX strokeWidth={1.5} />
            ) : (
              <Volume2 strokeWidth={1.5} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ShoppableSocialVideo.displayName = 'ShoppableSocialVideo';
ShoppableSocialVideo.Schema = Schema;
