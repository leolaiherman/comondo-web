import Image from 'next/image';
type OfferCardProps = {
  title: string;
  description: string;
  imgSrc: string;
};

export default function OfferCard({ title, description, imgSrc }: OfferCardProps) {
  return (
    // <div className="w-96 h-[560px] p-8 rounded-[40px] shadow-[0px_4px_8px_0px_rgba(0,0,0,1.00)] outline outline-1 outline-black/0 inline-flex flex-col justify-start items-center gap-8">
    <div className='w-96 h-[560px] p-8 bg-white rounded-[40px] shadow-[-4px_4px_12px_0px_rgba(0,0,0,0.15),inset_0px_0px_21px_0px_rgba(0,0,0,0.10),inset_0px_4px_12px_0px_rgba(255,255,255,0.13)] outline-1 outline-white/30 backdrop-blur-blur inline-flex flex-col justify-start items-center gap-8'>
      <Image
        width={182}
        height={220}
        src={imgSrc}
        alt={title}
        // className="w-44 h-56 "
        className='w-44 h-56'
      />
      <div className="self-stretch flex flex-col justify-center items-center gap-8">
        <h3 className="self-stretch justify-start text-3xl font-extrabold text-slate-900 mb-2 leading-9">{title}</h3>
        <p className="self-stretch text-left text-xl text-slate-900 leading-normal">{description}</p>
      </div>
    </div>
  );
}
