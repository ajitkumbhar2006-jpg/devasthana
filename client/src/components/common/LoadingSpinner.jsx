function LoadingSpinner() {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="flex items-center gap-4 rounded-full bg-white/90 px-6 py-4 shadow-aura">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-saffron border-t-transparent" />
        <span className="text-sm font-medium text-ink">Loading temple content...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
