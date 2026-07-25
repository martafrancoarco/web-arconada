export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start leading-none ${className}`}>
      <span className="tracking-[0.3em]">ARCO</span>
      <span className="tracking-[0.3em]">NADA</span>
    </div>
  );
}
