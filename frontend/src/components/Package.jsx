import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, content: "Varanasi", videoUrl: "https://videos.pexels.com/video-files/4685716/4685716-sd_640_360_30fps.mp4", imageUrl: "https://images.pexels.com/photos/17869859/pexels-photo-17869859/free-photo-of-ganges-coast-in-varanasi-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 2, content: "Jaipur", videoUrl: "https://videos.pexels.com/video-files/5243307/5243307-sd_640_360_25fps.mp4", imageUrl: "https://images.ctfassets.net/bth3mlrehms2/15FkRQjgtqJC4L40yhFg6W/4dff837ed92569427b2607e9b5a51826/iStock-639075168.jpg?w=3865&h=2576&fl=progressive&q=50&fm=jpg" },
  { id: 3, content: "Srinagar", videoUrl: "https://videos.pexels.com/video-files/20530145/20530145-sd_540_960_30fps.mp4", imageUrl: "https://images.pexels.com/photos/8629979/pexels-photo-8629979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const ITEMS_PER_PAGE = 3;

export const Package = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [playingVideos, setPlayingVideos] = useState({});
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePlayVideo = (id) => {
    setPlayingVideos((prev) => ({ ...prev, [id]: true }));
  };

  const handleNavigate = (city) => {
    navigate(`/travelbot/${city}`);
  };

  return (
    <div className="container mx-auto text-center pt-4 pb-8 bg-blue-400">
      <h1 className="text-white font-bold text-5xl font-mono py-2">Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 p-8">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500 cursor-pointer"
            onClick={() => handleNavigate(item.content)}
          >
            <div className="flex-grow flex items-center justify-center">
              {playingVideos[item.id] ? (
                <video width="100%" height="100%" controls autoPlay loop muted className="w-full h-96 object-cover">
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.content}
                  className="w-full h-96 object-cover"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayVideo(item.id);
                  }}
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-4">{item.content}</h2>
              <p className="text-gray-700 mt-2">Details about {item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
