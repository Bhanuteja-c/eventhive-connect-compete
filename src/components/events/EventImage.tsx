
interface EventImageProps {
  image?: string;
  title: string;
}

export function EventImage({ image, title }: EventImageProps) {
  return (
    <div className="h-40 bg-gradient-to-r from-eventhive-primary to-eventhive-secondary">
      {image ? (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <span className="text-xl font-semibold">{title.charAt(0)}</span>
        </div>
      )}
    </div>
  );
}
