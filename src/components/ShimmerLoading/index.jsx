import "./shimmerStyles.css"

export default function ShimmerLoading({ className }) {
  return (
    <div className={`shimmer-wrapper ${className}`}>
      <div className="shimmer"></div>
    </div>
  );
}