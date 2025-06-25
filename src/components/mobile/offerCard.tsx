import Image from 'next/image';
type OfferCardProps = {
  title: string;
  description: string;
  imgSrc: string;
};

export default function OfferCard({ title, description, imgSrc }: OfferCardProps) {
  return (
    <div className="w-72 max-w-full h-auto p-4 bg-white rounded-2xl shadow-md outline-1 outline-white/20 flex flex-col justify-start items-center gap-4">
      <Image
        width={120}
        height={120}
        src={imgSrc}
        alt={title}
        className="w-28 h-28 object-contain"
      />
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight text-center">{title}</h3>
        <p className="text-sm text-slate-900 leading-normal text-center">{description}</p>
      </div>
    </div>
  );
}