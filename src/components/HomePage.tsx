import { useEffect, useState } from "react";
import Line from "../public/Line 1.svg"
import { FaGithub } from "react-icons/fa";

import MostMatchImg from "../images/MostMatch.png"
const images = import.meta.glob('../images/*.{png,jpg,jpeg,svg}');

import Display from "./Display";
import '../index.css'

interface ImageModule {
  default: string;
}

const HomePage = () => {
  const [imageList, setImageList] = useState<{ src: string, alt: string }[]>([]);
  const [ chosenLabels, setChosenLabels ] = useState<string[]>([]);
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        Object.keys(images).map(async (path) => {
          const module = await images[path]() as ImageModule;
          const src = module.default;
          return { src, alt: path.split('/').pop() || 'image' };
        })
      );
      setImageList(loadedImages);
    };

    loadImages();
  }, []);
  const handleClick = (label: string) => {
    if (chosenLabels.includes(label)) {
      setChosenLabels(chosenLabels.filter((l) => l !== label));
    } else {
      setChosenLabels([...chosenLabels, label]);
    }
  }
  const buttonLabels = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5','Tag 6', 'Tag 7', 'Tag 8'];
  
  // const Displays = [
  //   {src: imageList[0].src, alt: "Display 1", content: "content here"},
  //   {src: imageList[1].src, alt: "Display 2", content: "content here"},
  //   {src: imageList[2].src, alt: "Display 3", content: "content here"},
  //   {src: imageList[3].src, alt: "Display 4", content: "content here"},
  //   {src: imageList[4].src, alt: "Display 5", content: "content here"},
  //   {src: imageList[5].src, alt: "Display 6", content: "content here"},
  // ]
  ;
  return (
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
        <textarea className="w-full h-1/3 bg-gainsboro text-black font-inter text-base rounded-[16px] py-2 resize-none scrollbar-hide" placeholder="Prompt goes here..."></textarea>
        <div className={`flex flex-wrap justify-start ${(chosenLabels.length ==0) ? "h-[32px]" : ""}`}>
          {chosenLabels.map((label, index) => (
            <button key={index} className="w-1/6 p-1 bg-gainsporo text-sm font-semibold font-inter text-black text-center rounded-[20px] m-1">
              {label}
            </button>
          ))}
        </div>
        <h1 className="font-inter my-1 text-peachpuff text-xl">Most Suitable Result</h1>
        <Display src={MostMatchImg} alt="Most Suitable Result Image" content="content here"/>
        </div>
        {/* Display */}
        <div className="w-2/3 overflow-y-auto scrollbar-thin pr-4">
          <h1 className="font-inter my-1 text-peachpuff text-xl">Other Suggestions</h1>
          <div className=" grid grid-cols-3 gap-4 ">
          {imageList.map((image) => (
          <Display src={image.src} alt={image.alt} content="content here"/>
          ))}
        </div>
        </div>
      </div>
      
    </section>
  )
}

export default HomePage