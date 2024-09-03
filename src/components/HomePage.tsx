import { useEffect, useState } from "react";
import Line from "../public/Line 1.svg"
import { FaGithub } from "react-icons/fa";
import videotest from "../videos/video1.mp4"

const videos = import.meta.glob('../videos/*.{mp4,webm}');

import Display from "./Display";
import '../index.css'

interface VideoModule {
  default: string;
}

const HomePage = () => {
  const [videoList, setVideoList] = useState<{ src: string, alt: string }[]>([]);
  const [chosenLabels, setChosenLabels] = useState<string[]>([]);
  const [isZoomedIn, setIsZoomedIn] = useState(false); // State to manage zoom
  const [zoomedInVideo, setZoomedInVideo] = useState<string | null>(null); // State to track the zoomed-in video

  const handleVideoClick = (src: string) => {
    console.log(`Video clicked: ${src}`);
    setIsZoomedIn(true); // Set zoom state to true
    setZoomedInVideo(src); // Set the currently zoomed-in video
  };

  const handleCloseClick = () => {
    console.log('Close button clicked');
    setIsZoomedIn(false); // Zoom out when close button is clicked
    setZoomedInVideo(null); // Reset the zoomed-in video
  };

  useEffect(() => {
    const loadVideos = async () => {
      const loadedVideos = await Promise.all(
        Object.keys(videos).map(async (path) => {
          const module = await videos[path]() as VideoModule;
          const src = module.default;
          return { src, alt: path.split('/').pop() || 'video' };
        })
      );
      setVideoList(loadedVideos);
    };

    loadVideos();
  }, []);

  const handleClick = (label: string) => {
    if (chosenLabels.includes(label)) {
      setChosenLabels(chosenLabels.filter((l) => l !== label));
    } else {
      setChosenLabels([...chosenLabels, label]);
    }
  }

  const buttonLabels = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5','Tag 6', 'Tag 7', 'Tag 8'];

  return (
    <div className={`homepage-container ${isZoomedIn ? 'blur-background' : ''}`}>
      <section className="flex flex-col w-screen h-screen bg-gray">
        {/* header */}
        <header className="relative flex mt-8 mx-12 tracking-[0.1em] justify-start text-17xl ">
          <div className="text-peachpuff font-inter font-bold">AI Challenge 2024</div>
          <img src={Line} alt="" className="w-2 h-12 object-cont mx-2"/>
          <div className="text-peachpuff font-inter font-bold">SecTon</div>
          <a href="https://github.com/Chowkey/UI-AI-Challenge" target="_blank" rel="noopener noreferrer" className="absolute right-0 top-0">
            <FaGithub className="text-white text-3xl" />
          </a>
        </header>
        {/* tagbar */}
        <div className="flex justify-start mx-12 mt-4 gap-8 ">
          {buttonLabels.map((label, index) => (
            <button key={index} 
              className={`px-6 py-2 text-base font-semibold font-inter text-center rounded-[20px] ${chosenLabels.includes(label) ? 'bg-gainsporo text-black' : 'bg-slategray text-white'}`}
              onClick={() => {handleClick(label)}}>
              {label}
            </button>
          ))}
        </div>
        {/* main */}
        <div className="flex flex-row mx-12 mt-4 h-3/4 gap-8">
          {/* prompt */}
          <div className="h-[95%] w-1/4 bg-slategray rounded-xl p-5">
            <textarea className="w-full h-1/3 bg-gainsboro text-black font-inter text-[19px] rounded-[16px] py-2 resize-none scrollbar-hide " placeholder="Prompt goes here..."></textarea>
            <div className={`flex flex-wrap justify-start h-[64px]`}>
              {chosenLabels.map((label, index) => (
                <button key={index} className="w-1/6 h-2/5 p-1 bg-gainsporo text-sm font-semibold font-inter text-black text-center rounded-[20px] m-1">
                  {label}
                </button>
              ))}
            </div>
            <h1 className="font-inter  my-1 text-peachpuff text-xl">Most Suitable Result</h1>
            <div className="video-wrapper">
              <Display
                src={videotest}
                content="Most Suitable Result"
                isZoomedIn={isZoomedIn && zoomedInVideo === videotest}
                handleVideoClick={() => handleVideoClick(videotest)}
                handleCloseClick={handleCloseClick}
              />
            </div>
          </div>
          {/* Display */}
          <div className="w-2/3 overflow-y-auto scrollbar-thin pr-4">
            <h1 className="font-inter my-1 text-peachpuff text-xl">Other Suggestions</h1>
            <div className="grid grid-cols-3 gap-4">
              {videoList.map((video) => (
                <Display
                  src={video.src}
                  content="content here"
                  key={video.src}
                  isZoomedIn={isZoomedIn && zoomedInVideo === video.src}
                  handleVideoClick={() => handleVideoClick(video.src)}
                  handleCloseClick={handleCloseClick}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Overlay for zoomed-in video */}
      {isZoomedIn && zoomedInVideo && (
        <div className="overlay">
          <Display
            src={zoomedInVideo}
            content="Zoomed Video"
            isZoomedIn={true}
            handleVideoClick={() => {}}
            handleCloseClick={handleCloseClick}
          />
        </div>
      )}
    </div>
  )
}

export default HomePage;