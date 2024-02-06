import { useRef, useEffect } from 'react'

export const useAudio = (src, { volume = 1, playbackRate = 1, loop = true }) => {
  const audio = useRef(new Audio(src))

  useEffect(() => {
    audio.current.volume = volume
  }, [volume])

  useEffect(() => {
    audio.current.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    audio.current.loop = loop;
  }, [loop])

  return audio.current
}