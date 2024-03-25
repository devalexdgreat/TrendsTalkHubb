export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="h-screen w-full flex justify-center items-center bg-white text-black">
            <div className="text-center flex flex-col justify-center items-center">
                <h1>TrendsTalk Hubb.</h1>
                <h1 className="font-bold leading-9">Loading...</h1>
            </div>
        </div>
    );
  }