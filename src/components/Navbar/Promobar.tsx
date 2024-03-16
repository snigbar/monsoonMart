export default function Promobar({ message }: { message: string }) {
  return (
    <div className="w-full h-min py-4 bottom-border text-center font-medium">
      {message}
    </div>
  );
}
