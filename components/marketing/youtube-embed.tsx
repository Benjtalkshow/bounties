'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

interface YouTubeEmbedProps {
  id: string;
  title: string;
}

/** Lazy YouTube player: shows the poster + play button, loading the iframe on click. */
export function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className='size-full'
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow='autoplay; encrypted-media; picture-in-picture; web-share'
        allowFullScreen
      />
    );
  }

  return (
    <button
      type='button'
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className='group size-full bg-cover bg-center'
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)`,
      }}
    >
      <span className='flex size-full items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10'>
        <span className='flex h-12 w-[68px] items-center justify-center rounded-[18px] bg-[#FF0000] transition-transform group-hover:scale-105 sm:h-[60px] sm:w-[86px]'>
          <Play className='size-6 translate-x-px fill-white text-white sm:size-7' />
        </span>
      </span>
    </button>
  );
}
