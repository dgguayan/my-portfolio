import { FaRocket } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="hero" className="ml-20 mt-10 mb-10 mr-20 py-5 text-center rounded-lg">
      <h1 className="text-6xl text-black font-bold mb-4 text-center">
        <span className="inline-flex items-center justify-center gap-3">
          <span className='text text-white uppercase text-[45px] font-thin'>LETS GET <span className='font-black'>STRAIGHT TO THE POINT</span>. I KNOW WHAT YOU’RE <span className='font-black'>LOOKING</span> FOR.</span>
        </span>
        <span className='text text-white uppercase text-7xl font-thin'>MY <span className='font-black underline'>PROJECTS</span> AND <span className='font-black underline'>EXPERIENCES</span></span>
      </h1>
    </section>
  );
}